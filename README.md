### Task -2 : API Documentation

#### Base URL

https://example.com/api/v1/app


#### API Endpoints

1. **Create Nudge**
   - **URL:** `/nudges`
   - **Method:** POST
   - **Payload:**
     ```json
     {
       "title": "string",
       "image_url": "string",
       "scheduled_time": "datetime",
       "description": "string",
       "icon": "string",
       "invitation": "string"
     }
     ```
   - **Description:** Creates a new nudge with the provided details.

2. **Get Nudge by ID**
   - **URL:** `/nudges/{nudge_id}`
   - **Method:** GET
   - **Description:** Retrieves details of a specific nudge identified by its ID.

3. **Update Nudge**
   - **URL:** `/nudges/{nudge_id}`
   - **Method:** PUT
   - **Payload:**
     ```json
     {
       "title": "string",
       "image_url": "string",
       "scheduled_time": "datetime",
       "description": "string",
       "icon": "string",
       "invitation": "string"
     }
     ```
   - **Description:** Updates details of a specific nudge identified by its ID.

4. **Delete Nudge**
   - **URL:** `/nudges/{nudge_id}`
   - **Method:** DELETE
   - **Description:** Deletes a specific nudge identified by its ID.

### CRUD Functionalities Documentation

#### Create
- **Endpoint:** `/nudges`
- **Method:** POST
- **Payload:** JSON object containing nudge details.
- **Description:** Creates a new nudge with the provided details.

#### Read
- **Endpoint:** `/nudges/{nudge_id}`
- **Method:** GET
- **Description:** Retrieves details of a specific nudge identified by its ID.

#### Update
- **Endpoint:** `/nudges/{nudge_id}`
- **Method:** PUT
- **Payload:** JSON object containing updated nudge details.
- **Description:** Updates details of a specific nudge identified by its ID.

#### Delete
- **Endpoint:** `/nudges/{nudge_id}`
- **Method:** DELETE
- **Description:** Deletes a specific nudge identified by its ID.

