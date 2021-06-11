Liquid E2E test suite
---
To run tests locally put `.env` file in project root directory containing variables:
```dotenv
LIQUID_URL="http://liquid.example.org"
HOOVER_URL="http://hoover.liquid.example.org"
HOOVER_USER_USERNAME="john"
HOOVER_USER_EMAIL="john@thebeatles.com"
HOOVER_USER_PASSWORD="johnpassword"
HOOVER_ADMIN_USERNAME="admin"
HOOVER_ADMIN_EMAIL="admin@example.com"
HOOVER_ADMIN_PASSWORD="adminpassword"
HEADLESS="false"
``` 
then run:
- `npm install`
- `npm test`