# Chatbot App

## Database info

Data is saved to the following tables:
- **all_responses** : raw responses inserted as they come in
- **submission_total**:  total responses by question from all time, tally updated as each response comes in
- **day_responses**: raw responses inserted as they come in, wiped each day as the data is aggregated
- **submission_day**: aggregated answer counts by day, for the current month
- **submission_month**: aggregated answer counts by month, for the current year
- **submission_year**: aggregated answer counts by year

To import database seeds:
`lando db-import [path]/seeds.sql --no-wipe`

To connect to the database via terminal:
`lando drush sql-cli`

