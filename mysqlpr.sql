Create database User_Interface;
Use  User_Interface;
Create table User_details(username varchar(30)not null , email varchar(40)not null,password varchar(8)not nul);
 Create table Task_management(title varchar(30) not null,description varchar(200) not null,due_date date,status varchar(20) not null);