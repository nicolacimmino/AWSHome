# ID-Dispenser #

The ID-Dispenser service is responsible to provide sequential and unpredictable identifiers for resources used by AWSHome services.

# API #

## Dispense Method ##

### Request ###

````JSON
{
  "idtag": "gid" 
}
````

### Response ###

````JSON
{
  "status":"OK",
  "response": 
  {
    "id":68,
    "idtag":"gid",
    "encoded":"OxaYbwKR"
  }
 }
````
