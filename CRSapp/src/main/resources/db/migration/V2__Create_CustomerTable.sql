CREATE TABLE customers (
    id int unsigned NOT NULL AUTO_INCREMENT,
    customer_id varchar(50) NOT NULL,
    customer_type varchar(50) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;