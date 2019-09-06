# Record-Store #


The record store microservice is an internal (no public API) service responsible to store records provided by devices and some metadata about the devices and journals themselves. Additionally the Record Store microservice is responsbile of the housekeeping such as deleting data of removed devices and cleaning up of old hystorical records. The Record Store is designed to handle the actual live, transactional part of the service ([OLTP](https://en.wikipedia.org/wiki/Online_transaction_processing)), eventual long term data warehousing and analitical functions ([OLAP](https://en.wikipedia.org/wiki/Online_analytical_processing)) will be taken care by separate services if the requirement arises.

## Data Persistance ##

For the data persistance layer DynamoDB was selected mostly in considferation of scalability. While the nature of the collected data, a time series, is in general not considered a good fit for DDB in this case, being the length of the data series minimal, the scalability abilities of DDB made it the preferred solution. 

### Naming Conventions ###

To keep things consistent with the rest of the project naming conventions match those used in other services in AWSHome ([Naming Conventions](https://github.com/nicolacimmino/AWSHome/wiki/Naming-Conventions)). Below, for reference, the terms used throughout the code and descriptions that are pertinent to the Record Store service only.

**Group** A generic concept of group of devices is intriduced to help partition data more efficiently. What a "group" represents is completely up to the application making use of the store and, potentially, different applications could make use of different group models. Applications might have a notion of "user" owning a certain amount of devices so a unique user ID would be a natual group choice that would allow to fetch all data concerning that user devices in one operation. For a different kind of application though, for instance a corporate account allowing to monitor several sites with many devices, it could be more efficient to have the group defined as a site if not even a floor on an area inside the site. It's crucial to understand that from the Record Store perspective operations can be performed only on a group.

### Data access Patterns ###

Considering the application general requirements the following data access patterns were identified, ranked from the most common down.

| Case                                                              |
|-------------------------------------------------------------------|
| Device adds journal record                                        |
| List all devices in group                                         |
| List all journals in group                                        |
| Get one device records in a certain time range                    |
| Get latest records for all devices in group                       |
| Get latest record for a device                                    |
| Add device                                                        |
| Remove device                                                     |
| DeleteItem                                                        |
| Alter device                                                      |
| Add group                                                         |
| Alter group                                                       |
| Remove group                                                      |

### Key Schema ###

To satisfy the above access patterns the following Key Schema was devised:

| Partition Key | Sort Key                 | Attributes                                                              |
|---------------|--------------------------|-------------------------------------------------------------------------|
| GID           | Group#GID#                | Group attirbutes (name, etc.)                                           |
| GID           | Device#DID#               | Device attributes (name, ACL policy doc, model etc.)                    |
| GID           | Journal#DID#JID#          | Journal attributes (name, data type)                                    |
| GID           | Record#DID#JID#TIMESTAMP# | Latest journal entry attributes (measured value, unit, type, timestamp) |
| GID           | LatestRecord#DID#JID#     | Journal record attributes (measured value, unit, type, timestamp)       |

NOTE: Sort keys end with # as a choice has been made to have DID and JID being simple incrementing IDs, this allows for queries using conditions as "begins_with" to work correctly.

### Data Access Operations ###

As a reference and to validate the key schema in all the assumed data access patterns, the table below summarises the actual DDB operations for each case.


| Case                                                              | Action      | 
|-------------------------------------------------------------------|-------------| 
| Device adds journal record                                        | PutItem&nbsp;PK=GID&nbsp;SK=Record#DID#JID#TIMESTAMP#<br>UpdateItem&nbsp;PK=GID&nbsp;SK=LatestRecord#DID#JID#| 
| List all devices in group                                         | Query&nbsp;PK=GID&nbsp;begins_with(SK,Device#)| 
| List all journals in group                                        | Query&nbsp;PK=GID&nbsp;begins_with(SK,Jorunal#)| 
| Get one device records in a certain time range                    | Query&nbsp;PK=GID&nbsp;SK&nbsp;between(Record#DID#JID#START_DATE,Record#DID#JID#END_DATE)| 
| Get latest records for all devices in group                       | Query&nbsp;PK=GID&nbsp;begins_with(SK,LatestRecord#)| 
| Get latest record for a device                                    | Query&nbsp;PK=GID&nbsp;begins_with(SK,LatestRecord#DID#)| 
| Add device                                                        | PutItem&nbsp;PK=GID&nbsp;SK=Device#DID#| 
| Remove device                                                     | DeleteItem&nbsp;PK=GID&nbsp;SK=Device#DID<br>DeleteItem&nbsp;PK=GID&nbsp;begins_with(SK,Journal#DID#)<br>DeleteItem&nbsp;PK=GID&nbsp;begins_with(SK,Record#DID)<br>DeleteItem&nbsp;PK=GID&nbsp;begins_with(SK,LatestRecord#DID#)| 
| Alter device                                                      | PutItem&nbsp;PK=GID&nbsp;SK=Device#DID# | 
| Add group                                                         | PutItem&nbsp;PK=GID&nbsp;SK=Group#GID# | 
| Alter group                                                       | PutItem&nbsp;PK=GID&nbsp;SK=Group#GID# | 
| Remove group                                                      | DeleteItem&nbsp;PK=GID | 


# API #

## awsh-recordstore-{$stage}-store ##

This function provides 

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
