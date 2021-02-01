CREATE TABLE rents (
    id int unsigned NOT NULL AUTO_INCREMENT,
    customer_auto_id int unsigned NOT NULL,
    vehicle_id int unsigned NOT NULL,
    start_timestamp TIMESTAMP NOT NULL,
    return_timestamp TIMESTAMP NOT NULL,
    is_returned boolean DEFAULT false,
    PRIMARY KEY (id),
    FOREIGN KEY (customer_auto_id) REFERENCES customers(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;