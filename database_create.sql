CREATE TABLE employees (
	id SERIAL PRIMARY KEY,
	first_name varchar(60),
	last_name varchar(60),
	title varchar(60),
	salary float,
	active boolean
);