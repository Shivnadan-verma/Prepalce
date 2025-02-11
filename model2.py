# Import Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
import pickle
import matplotlib.pyplot as plt
import seaborn as sns

# Load Dataset
df = pd.read_csv("placement_data.csv")

# Handle Missing Values
numeric_columns = df.select_dtypes(include=[np.number]).columns
df[numeric_columns] = df[numeric_columns].fillna(df[numeric_columns].mean())

categorical_columns = df.select_dtypes(include=['object', 'category']).columns
df[categorical_columns] = df[categorical_columns].apply(lambda col: col.fillna(col.mode()[0]))

# Aggregate AMCAT Sectional Scores
required_columns = ['Placement_status', 'sessional_marks', 'Class_attendance', 'project_marks',
                    'LA2SS', 'LA3SS', 'LA4SS', 'LA5SS', 'LA6SS',
                    'QA2SS', 'QA3SS', 'QA4SS', 'QA5SS', 'QA6SS',
                    'EC2SS', 'EC3SS', 'EC4SS', 'EC5SS', 'EC6SS',
                    'DS3S', 'DS4S', 'DS5S', 'DS6S',
                    'AS5S', 'AS6S']

amcat_numeric_columns = df[required_columns].apply(pd.to_numeric, errors='coerce')
df['Logical_Ability'] = amcat_numeric_columns[['LA2SS', 'LA3SS', 'LA4SS', 'LA5SS', 'LA6SS']].mean(axis=1)
df['Quantitative_Ability'] = amcat_numeric_columns[['QA2SS', 'QA3SS', 'QA4SS', 'QA5SS', 'QA6SS']].mean(axis=1)
df['English_Comprehension'] = amcat_numeric_columns[['EC2SS', 'EC3SS', 'EC4SS', 'EC5SS', 'EC6SS']].mean(axis=1)
df['Domain_Knowledge'] = amcat_numeric_columns[['DS3S', 'DS4S', 'DS5S', 'DS6S']].mean(axis=1)
df['Automata_Programming'] = amcat_numeric_columns[['AS5S', 'AS6S']].mean(axis=1)

# Features and Target Variable
features = ['sessional_marks', 'Class_attendance',
            'Logical_Ability', 'Quantitative_Ability',
            'English_Comprehension', 'Domain_Knowledge', 'Automata_Programming', 'project_marks']
X = df[features]
y = df['Placement_status']

# Feature Scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train-Validation-Test Split
X_train, X_temp, y_train, y_temp = train_test_split(X_scaled, y, test_size=0.4, random_state=42, stratify=y)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42, stratify=y_temp)

# Hyperparameter Tuning
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20, 30],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}
grid_search = GridSearchCV(RandomForestClassifier(random_state=42), param_grid, scoring='accuracy', cv=5, verbose=2)
grid_search.fit(X_train, y_train)

# Evaluate on Validation and Test Sets
best_model = grid_search.best_estimator_
y_val_pred = best_model.predict(X_val)
val_accuracy = accuracy_score(y_val, y_val_pred)
y_test_pred = best_model.predict(X_test)
test_accuracy = accuracy_score(y_test, y_test_pred)

print(f"Validation Accuracy: {val_accuracy:.2f}")
print(f"Test Accuracy: {test_accuracy:.2f}")

# Save Model and Scaler
with open('final_model.pkl', 'wb') as model_file:
    pickle.dump(best_model, model_file)
with open('final_scaler.pkl', 'wb') as scaler_file:
    pickle.dump(scaler, scaler_file)

# Feature Importance Visualization
feature_importance = best_model.feature_importances_
feature_names = features

plt.figure(figsize=(10, 6))
sns.barplot(x=feature_importance, y=feature_names, palette="coolwarm")
plt.title('Feature Importance for Random Forest', fontsize=16)
plt.xlabel('Importance Score')
plt.ylabel('Feature')
plt.show()
