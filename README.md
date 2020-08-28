# README

Interview schedular :

### Stack

* [Ruby 2.7.1]
* [Rails 6.0.3.2]
* [React JS]
* [Bootstrap](https://github.com/abhishek-kr-01/scheduler/blob/master/app/views/layouts/application.html.erb) for Responsive layouts (mobile first!)

### Heroku

* [Rails Appointment Scheduler](https://interview-scheduler-010.herokuapp.com/)

**To run on your local machine:**

* Clone the repo and cd into the project folder.
  ```sh
  $ git clone https://github.com/abhishek-kr-01/scheduler.git
  $ cd schedular
  ```

* Check your ruby and rails versions and then run :
  ```sh
  $ bundle install
  ```

* To start the server run :
  ```sh
  $ rails s
  ```
## API Endpoints :
  Base url : http://localhost:3000/api/v1/
  *  GET          /api/v1/meetings                      (fetch all meetings)                                                            
  * POST          /api/v1/meetings                      (create new meeting)                                                             
  * GET           /api/v1/meetings/:id                  (fetch single meeting)                                                     
  * PUT           /api/v1/meetings/:id                  (update single meeting)                                                   
  * DELETE        /api/v1/meetings/:id                  (delete single meeting)                                                           
  
## Versions :
* **Ruby** : 2.7.1
* **Rails** : 6.0.3.2
