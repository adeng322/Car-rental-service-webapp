CREATE TABLE vehicles (
    id int unsigned NOT NULL AUTO_INCREMENT,
    vehicle_type varchar(50) NOT NULL,
    vehicle_location varchar(50) DEFAULT NULL,
    is_avaliable boolean NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("L1", "A-1", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("L1", "A-2", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("L2", "A-3", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("L2", "A-4", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("L3", "A-5", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("L3", "A-6", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("L4", "A-7", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("L4", "A-8", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("L5", "A-9", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("L5", "A-10", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("L6", "B-1", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("L6", "B-2", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("L7", "B-3", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("L7", "B-4", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("M1", "B-5", true);

INSERT INTO vehicles (vehicle_type, vehicle_location, is_avaliable)
VALUES ("M1", "B-6", true);