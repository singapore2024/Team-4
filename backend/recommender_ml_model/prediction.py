import xgboost as xgb
import pandas as pd

# Load the trained XGBoost model
model = xgb.XGBRegressor()
model.load_model('xgboost_model.json')

# Define current stock levels
current_stock = {
    'Broccoli': 10,
    'Fish': 15,
    'Rice': 0,
    'Cooking Cream': 0,
    'Chicken': 0
}

# static values for prediction
month = 10
week_of_year = 41  

lag_data = {
    'Broccoli': {'lag_1_week_used': 8, 'lag_2_week_used': 7, 'lag_1_week_expired': 0.5, 'lag_2_week_expired': 0.3},
    'Fish': {'lag_1_week_used': 10, 'lag_2_week_used': 9, 'lag_1_week_expired': 0.7, 'lag_2_week_expired': 0.4},
    'Rice': {'lag_1_week_used': 0, 'lag_2_week_used': 0, 'lag_1_week_expired': 0, 'lag_2_week_expired': 0},
    'Cooking Cream': {'lag_1_week_used': 0, 'lag_2_week_used': 0, 'lag_1_week_expired': 0, 'lag_2_week_expired': 0},
    'Chicken': {'lag_1_week_used': 0, 'lag_2_week_used': 0, 'lag_1_week_expired': 0, 'lag_2_week_expired': 0}
}

rolling_stats = {
    'Broccoli': {'rolling_avg_4_weeks_used': 7.5, 'rolling_std_4_weeks_used': 0.5},
    'Fish': {'rolling_avg_4_weeks_used': 9.5, 'rolling_std_4_weeks_used': 0.6},
    'Rice': {'rolling_avg_4_weeks_used': 0, 'rolling_std_4_weeks_used': 0},
    'Cooking Cream': {'rolling_avg_4_weeks_used': 0, 'rolling_std_4_weeks_used': 0},
    'Chicken': {'rolling_avg_4_weeks_used': 0, 'rolling_std_4_weeks_used': 0}
}

ingredients = ['Broccoli', 'Fish', 'Rice', 'Cooking Cream', 'Chicken']

data_rows = []

for ingredient in ingredients:
    row = {
        'stock_remaining_end_week': current_stock[ingredient],
        'month': month,
        'week_of_year': week_of_year,
        'lag_1_week_used': lag_data[ingredient]['lag_1_week_used'],
        'lag_2_week_used': lag_data[ingredient]['lag_2_week_used'],
        'lag_1_week_expired': lag_data[ingredient]['lag_1_week_expired'],
        'lag_2_week_expired': lag_data[ingredient]['lag_2_week_expired'],
        'rolling_avg_4_weeks_used': rolling_stats[ingredient]['rolling_avg_4_weeks_used'],
        'rolling_std_4_weeks_used': rolling_stats[ingredient]['rolling_std_4_weeks_used'],
        # One-Hot Encoding for ingredients
        'ingredient_Rice': 1 if ingredient == 'Rice' else 0,
        'ingredient_Cooking Cream': 1 if ingredient == 'Cooking Cream' else 0,
        'ingredient_Chicken': 1 if ingredient == 'Chicken' else 0,
        'ingredient_Broccoli': 1 if ingredient == 'Broccoli' else 0,
        'ingredient_Fish': 1 if ingredient == 'Fish' else 0
    }
    data_rows.append(row)

input_df = pd.DataFrame(data_rows)

predicted_quantities = model.predict(input_df)

# safety stock (fixed at 20kg per item)
safety_stock = 20
recommended_orders = predicted_quantities + safety_stock

# Ensure that the recommended orders are non-negative
recommended_orders = [max(order, 0) for order in recommended_orders]

input_df['predicted_quantity'] = predicted_quantities
input_df['recommended_order_kg'] = recommended_orders

# Display the DataFrame with predictions
input_df[['ingredient_Rice', 'ingredient_Cooking Cream', 'ingredient_Chicken', 'ingredient_Broccoli', 'ingredient_Fish', 'recommended_order_kg']]


