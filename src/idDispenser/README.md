# ID-Dispenser #

The ID-Dispenser service is responsible to provide sequential and unpredictable identifiers for resources used by AWSHome services.

# API #

## awsh-iddispenser-{$stage}-dispense ##

This function provides the next sequential ID for the given idtag. The response contains both the sequential value and its relative encoded value.

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

## awsh-iddispenser-{$stage}-decode ##

This function allows to decode an encoded id to find its sequential value. The response contains both the sequential value and its relative encoded value.

### Request ###

````JSON
{
  "idtag": "gid",
  "encoded": "OxaYbwKR"
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

## Errors ##

Should an error occur the response status will be "ERROR" and both a human readable error message and an error code will be returned.

### Example ###

````JSON
{
  "status": "ERROR",
  "errorMessage": "Encoded id is not valid.",
  "errorCode": "FORMAT_INVALID"
}
````
