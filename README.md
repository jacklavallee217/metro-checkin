# metro-checkin

metro-checkin was developed to be an upgraded gym checkin system from the one currently at use at Metrorock Station in Essex Junction, VT

## Installation

Download MongoDB at: https://www.mongodb.com/try/download/community

    From within the newly downloaded MongoDB folder:
        
        - Access the bin folder:
        -- cd /bin

        - Run the Mongo Daemon:
        -- ./mongod

        - Create a new terminal tab

        - From within the same bin folder, run the command line shell
        -- ./mongo

    From within the project folder:

        - Run command:
        -- npm start

        - Access site in web browser at:
        -- localhost:8000

            ** if port 8000 is taken, change the port number on line 15 in the www file in the bin folder and save changes:
            -- var port = normalizePort(process.env.PORT || '8000');



## Usage

    - Create Waivers/Accounts at:
    -- localhost:8000/waiver

    - Access site at:
    -- localhost:8000
