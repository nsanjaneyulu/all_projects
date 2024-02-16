CREATE TABLE `contact` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `phone_number1` varchar(30) DEFAULT NULL,
  `phone_number2` varchar(30) DEFAULT NULL,
  `phone_number3` varchar(30) DEFAULT NULL,
  `emailId` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ;

CREATE TABLE `farm` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `registration_number` varchar(15) NOT NULL,
  `contact_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `registration_number` (`registration_number`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `farm_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`id`)
) ;

CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `line1` varchar(50) DEFAULT NULL,
  `line2` varchar(50) DEFAULT NULL,
  `line3` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `country` varchar(15) DEFAULT 'India',
  `id_contact` int(10) DEFAULT NULL,
  `type` varchar(30) NOT NULL DEFAULT 'P',
  PRIMARY KEY (`id`),
  KEY `id_contact` (`id_contact`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`id_contact`) REFERENCES `contact` (`id`)
) ;
CREATE TABLE `asset_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `asset` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `asset` (`asset`)
) ;


CREATE TABLE `asset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `asset_code` varchar(30) NOT NULL,
  `asset_type_id` int(11) NOT NULL,
  `asset_name` varchar(30) NOT NULL,
  `purchase_date` datetime NOT NULL,
  `quantitiy` decimal(10,2) NOT NULL DEFAULT '0.00',
  `unit_cost` decimal(10,2) NOT NULL DEFAULT '0.00',
  `description` varchar(150) NOT NULL,
  `remarks` varchar(300) DEFAULT NULL,
  `farm_id` int(10) NOT NULL,
  `total_cost` decimal(10,2) NOT NULL DEFAULT '0.00',
  `warranty_end_date` DATETIME NULL,  
  PRIMARY KEY (`id`),
  KEY `asset_type_id` (`asset_type_id`),
  KEY `asset_ibfk_2` (`farm_id`),
  CONSTRAINT `asset_ibfk_1` FOREIGN KEY (`asset_type_id`) REFERENCES `asset_type` (`id`),
  CONSTRAINT `asset_ibfk_2` FOREIGN KEY (`farm_id`) REFERENCES `farm` (`id`)
) ;

CREATE TABLE `breed_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `breed_type` varchar(30) NOT NULL,
  `description` varchar(150) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `breed_type` (`breed_type`)
) ;

CREATE TABLE `de_vermitization_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `de_vermitization_type` varchar(30) NOT NULL,
  `description` varchar(150) NULL,
  `interval_period` INT(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `de_vermitization_type` (`de_vermitization_type`)
) ;

CREATE TABLE `decease_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `decease` varchar(150) NOT NULL,
  `description` varchar(150)  NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `decease` (`decease`)
) ;

CREATE TABLE `health` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ;

CREATE TABLE `decease` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `decease_type_id` int(10) NOT NULL,
  `start_date` DATETIME NULL,
  `end_date` DATETIME NULL,
  `treatment_date` DATETIME NULL,
  `treatment_description` varchar(150) NOT NULL DEFAULT 'Default',
  `medicine` varchar(150) NOT NULL DEFAULT 'Default',
  `remarks` VARCHAR(150) NULL DEFAULT 'Default',
  `health_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `health_id` (`health_id`),
  KEY `decease_type_id` (`decease_type_id`),
  CONSTRAINT `decease_ibfk_2` FOREIGN KEY (`decease_type_id`) REFERENCES `decease_type` (`id`),
  CONSTRAINT `decease_ibfk_1` FOREIGN KEY (`health_id`) REFERENCES `health` (`id`)
) ;

CREATE TABLE `devermitization` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `health_id` int(10) DEFAULT NULL,
  `de_vermitization_type_id` int(10) NOT NULL,
  `last_vermitization_date` datetime NOT NULL,
  `next_vermitization_date` datetime NOT NULL,
  `vermitization_date` datetime NOT NULL,
  `manufactured_date` datetime DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL,
  `manufacturer_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `health_id` (`health_id`),
  KEY `de_vermitization_type_id` (`de_vermitization_type_id`),
  CONSTRAINT `devermitization_ibfk_2` FOREIGN KEY (`de_vermitization_type_id`) REFERENCES `de_vermitization_type` (`id`),
  CONSTRAINT `devermitization_ibfk_1` FOREIGN KEY (`health_id`) REFERENCES `health` (`id`)
) ;

CREATE TABLE `expense_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `expense` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `expense` (`expense`)
) ;

CREATE TABLE `state_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `state_type` varchar(30) NOT NULL,
  `description` varchar(150)  NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `state_type` (`state_type`)
) ;

CREATE TABLE `vendor_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `vendor` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vendor` (`vendor`)
) ;

CREATE TABLE `vendor` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `vendor_contact_id` int(10) DEFAULT NULL,
  `code` varchar(30) NOT NULL,
  `remarks` varchar(150) DEFAULT NULL,
  `vendor_type_id` int(10) NOT NULL,
  `farm_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `code` (`code`),
  KEY `vendor_contact_id` (`vendor_contact_id`),
  KEY `vendor_ibfk_2` (`vendor_type_id`),
  KEY `vendor_ibfk_3` (`farm_id`),
  CONSTRAINT `vendor_ibfk_1` FOREIGN KEY (`vendor_contact_id`) REFERENCES `contact` (`id`),
  CONSTRAINT `vendor_ibfk_2` FOREIGN KEY (`vendor_type_id`) REFERENCES `vendor_type` (`id`),
  CONSTRAINT `vendor_ibfk_3` FOREIGN KEY (`farm_id`) REFERENCES `farm` (`id`)
) ;

CREATE TABLE `statistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `height` varchar(10) DEFAULT NULL,
  `weight` varchar(10) DEFAULT NULL,
  `length` varchar(10) DEFAULT NULL,
  `appearance` varchar(500) NULL DEFAULT '',
  `production` varchar(10) DEFAULT NULL,
  `fat_percent` decimal(10,2) DEFAULT NULL,
  `purchase_price` decimal(10,2) NULL DEFAULT '0.00',
  `purchase_location` varchar(100) DEFAULT NULL,
  `purchase_date` datetime DEFAULT NULL,
  `transportation_dist` varchar(10) DEFAULT NULL,
  `transportation_cost` decimal(10,2) NULL DEFAULT '0.00',
  `purchase_farm` varchar(50) DEFAULT NULL,
  `purchase_broker` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

CREATE TABLE `origin_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `origin_type` varchar(30) NOT NULL,
  `description` varchar(150)  NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `origin_type` (`origin_type`)
) ;

CREATE TABLE `milking_status` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `status` varchar(30) NOT NULL,
  `description` varchar(150)  NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `status` (`status`)
) ;

CREATE TABLE `livestock` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `RFID` VARCHAR(64) NULL,
  `breed_type_id` int(10) NOT NULL,
  `state_type_id` int(10) NOT NULL,
  `origin_id` int(10) NOT NULL,
  `lactation_number` varchar(30) DEFAULT NULL,
  `lactation_days` int(10) DEFAULT NULL,
  `milking_status_id` int(2) NOT NULL,
  `birth_date` datetime NOT NULL,
  `conceived_date` datetime NULL,
  `vendor_id` int(10) DEFAULT NULL,
  `current_stat_id` int(11) DEFAULT NULL,
  `purchase_stat_id` int(11) DEFAULT NULL,
  `code` varchar(30) DEFAULT NULL,
  `mothercode` varchar(30) DEFAULT NULL,
  `sex` char(1) NOT NULL DEFAULT 'M',
  `farm_id` int(10) NOT NULL,
  `id_health` int(10) DEFAULT NULL,
  `mother_breed_id` int(10) NOT NULL,
  `father_semen_number` varchar(30) DEFAULT NULL,
  `delivery_mode` varchar(30) DEFAULT NULL,
  `initial_value` varchar(30) DEFAULT NULL,
  `remarks` varchar(300) DEFAULT NULL,
  `preferred_type` varchar(30) NOT NULL DEFAULT 'nurture',
  `yeild` decimal(10,2) NULL DEFAULT '0.00',
  `fat` decimal(10,2) NULL DEFAULT '0.00',
  `age` int(10) DEFAULT NULL,
  `stop_milking_date` DATETIME NULL DEFAULT NULL,
  `stop_milking_status` CHAR(1) NULL DEFAULT 'N',
  PRIMARY KEY (`id`),
  UNIQUE KEY `RFID` (`RFID`),
  KEY `vendor_id` (`vendor_id`),
  KEY `current_stat_id` (`current_stat_id`),
  KEY `purchase_stat_id` (`purchase_stat_id`),
  KEY `farm_id` (`farm_id`),
  KEY `id_health` (`id_health`),
  KEY `origin_id` (`origin_id`),
  KEY `breed_type_id` (`breed_type_id`),
  KEY `mother_breed_id` (`mother_breed_id`),
  KEY `milking_status_id` (`milking_status_id`),
  KEY `state_type_id` (`state_type_id`),
  CONSTRAINT `livestock_ibfk_10` FOREIGN KEY (`state_type_id`) REFERENCES `state_type` (`id`),
  CONSTRAINT `livestock_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`),
  CONSTRAINT `livestock_ibfk_2` FOREIGN KEY (`current_stat_id`) REFERENCES `statistics` (`id`),
  CONSTRAINT `livestock_ibfk_3` FOREIGN KEY (`purchase_stat_id`) REFERENCES `statistics` (`id`),
  CONSTRAINT `livestock_ibfk_4` FOREIGN KEY (`farm_id`) REFERENCES `farm` (`id`),
  CONSTRAINT `livestock_ibfk_5` FOREIGN KEY (`id_health`) REFERENCES `health` (`id`),
  CONSTRAINT `livestock_ibfk_6` FOREIGN KEY (`origin_id`) REFERENCES `origin_type` (`id`),
  CONSTRAINT `livestock_ibfk_7` FOREIGN KEY (`breed_type_id`) REFERENCES `breed_type` (`id`),
  CONSTRAINT `livestock_ibfk_8` FOREIGN KEY (`mother_breed_id`) REFERENCES `breed_type` (`id`),
  CONSTRAINT `livestock_ibfk_9` FOREIGN KEY (`milking_status_id`) REFERENCES `milking_status` (`id`)
) ;

CREATE TABLE `expenses` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_vendor` int(10) DEFAULT NULL,
  `receipt_number` varchar(30) NOT NULL,
  `sale_date` datetime NOT NULL,
  `remarks` varchar(250) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `id_livestock` int(10) DEFAULT NULL,
  `id_farm` int(10) NOT NULL,
  `id_expense_type` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_vendor` (`id_vendor`),
  KEY `id_livestock` (`id_livestock`),
  KEY `id_farm` (`id_farm`),
  KEY `expenses_ibfk_4` (`id_expense_type`),
  CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`id_vendor`) REFERENCES `vendor` (`id`),
  CONSTRAINT `expenses_ibfk_2` FOREIGN KEY (`id_livestock`) REFERENCES `livestock` (`id`),
  CONSTRAINT `expenses_ibfk_3` FOREIGN KEY (`id_farm`) REFERENCES `farm` (`id`),
  CONSTRAINT `expenses_ibfk_4` FOREIGN KEY (`id_expense_type`) REFERENCES `expense_type` (`id`)
) ;

CREATE TABLE `feed_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `feed_type` varchar(30) NOT NULL,
  `description` varchar(150) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `feed_type` (`feed_type`)
) ;

CREATE TABLE `feeding_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_slot_name` varchar(30) NOT NULL,
  `feed_type` varchar(30) NOT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order` (`order`),
  UNIQUE KEY `feed_slot_name` (`feed_slot_name`,`feed_type`),
  KEY `feed_type` (`feed_type`),
  CONSTRAINT `feeding_config_ibfk_1` FOREIGN KEY (`feed_type`) REFERENCES `feed_type` (`feed_type`)
) ;

CREATE TABLE `feeding_history` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `feed_type_id` int(10) NOT NULL,
  `id_livestock` int(10) DEFAULT NULL,
  `quantity` decimal(10,2) NOT NULL DEFAULT '0.00',
  `feed_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `feed_type_id` (`feed_type_id`),
  KEY `id_livestock` (`id_livestock`),
  CONSTRAINT `feeding_history_ibfk_2` FOREIGN KEY (`id_livestock`) REFERENCES `livestock` (`id`),
  CONSTRAINT `feeding_history_ibfk_1` FOREIGN KEY (`feed_type_id`) REFERENCES `feed_type` (`id`)
) ;

CREATE TABLE `images` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `raw_image` varbinary(2000) NOT NULL,
  `livestock_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `livestock_id` (`livestock_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`livestock_id`) REFERENCES `livestock` (`id`)
) ;

CREATE TABLE `inventory` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_farm` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_farm` (`id_farm`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`id_farm`) REFERENCES `farm` (`id`)
) ;

CREATE TABLE `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_number` varchar(30) NOT NULL,
  `name` varchar(150) NOT NULL,
  `dept_number` VARCHAR(30) NULL,
  `dept_name` VARCHAR(30) NULL,
  `salary` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hike_details` varchar(250) NULL,
  `hire_date` datetime NOT NULL,
  `releive_date` DATETIME NULL,
  `academic_qual` VARCHAR(250) NULL,
  `year_passing` INT(4) NULL DEFAULT '2000',
  `sex` char(1) NOT NULL DEFAULT 'M',
  `date_of_birth` datetime NOT NULL,
  `marital_status` char(1) NOT NULL DEFAULT 'M',
  `photo_id` int(10) DEFAULT NULL,
  `job_type` varchar(30) NOT NULL,
  `blood_group` varchar(3) NOT NULL DEFAULT 'o+',
  `id_contact` int(10) DEFAULT NULL,
  `spouse_name` VARCHAR(150) NULL,
  `id_farm` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `photo_id` (`photo_id`),
  KEY `id_contact` (`id_contact`),
  KEY `id_farm` (`id_farm`),
  CONSTRAINT `person_ibfk_1` FOREIGN KEY (`photo_id`) REFERENCES `images` (`id`),
  CONSTRAINT `person_ibfk_2` FOREIGN KEY (`id_contact`) REFERENCES `contact` (`id`),
  CONSTRAINT `person_ibfk_3` FOREIGN KEY (`id_farm`) REFERENCES `farm` (`id`)
) ;

CREATE TABLE `production_config` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `yeild_slot_name` varchar(10) NOT NULL,
  `order` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `yeild_slot_name` (`yeild_slot_name`),
  UNIQUE KEY `order` (`order`)
) ;

CREATE TABLE `production` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `production_config_id` int(10) NULL,
  `yield` decimal(10,2) NULL,
  `fat_percentile` decimal(10,2) DEFAULT NULL,
  `livestock_id` int(10) DEFAULT NULL,
  `farm_id` int(10) NOT NULL,
  `month` INT(10) NOT NULL,
  `snf` DECIMAL(10,2) NULL DEFAULT NULL,
  `clr` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `production_ibfk_2` (`farm_id`),
  KEY `production_ibfk_3` (`livestock_id`),
  CONSTRAINT `production_ibfk_1` FOREIGN KEY (`production_config_id`) REFERENCES `production_config` (`id`),
  CONSTRAINT `production_ibfk_2` FOREIGN KEY (`farm_id`) REFERENCES `farm` (`id`),
  CONSTRAINT `production_ibfk_3` FOREIGN KEY (`livestock_id`) REFERENCES `livestock` (`id`)
) ;

CREATE TABLE `promotion_history` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `livestock_id` int(10) NOT NULL,
  `initial_state_type` int(10) NOT NULL,
  `final_state_type` int(10) NOT NULL,
  `promotion_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `livestock_id` (`livestock_id`),
  KEY `initial_state_type` (`initial_state_type`),
  KEY `final_state_type` (`final_state_type`),
  CONSTRAINT `promotion_history_ibfk_3` FOREIGN KEY (`final_state_type`) REFERENCES `state_type` (`id`),
  CONSTRAINT `promotion_history_ibfk_1` FOREIGN KEY (`livestock_id`) REFERENCES `livestock` (`id`),
  CONSTRAINT `promotion_history_ibfk_2` FOREIGN KEY (`initial_state_type`) REFERENCES `state_type` (`id`)
) ;

CREATE TABLE `provisions` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `provision_name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `provision_name` (`provision_name`)
) ;

CREATE TABLE `provision_inventory` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_inventory` int(10) DEFAULT NULL,
  `provision_name` varchar(30) NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `purchase_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_inventory` (`id_inventory`),
  KEY `provision_name` (`provision_name`),
  CONSTRAINT `provision_inventory_ibfk_2` FOREIGN KEY (`provision_name`) REFERENCES `provisions` (`provision_name`),
  CONSTRAINT `provision_inventory_ibfk_1` FOREIGN KEY (`id_inventory`) REFERENCES `inventory` (`id`)
) ;
CREATE TABLE `receipt_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `receipt` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `receipt` (`receipt`)
) ;

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_vendor` int(10) DEFAULT NULL,
  `receipt_number` varchar(30) NOT NULL DEFAULT 'NULL',
  `sale_date` datetime NOT NULL,
  `id_receipt_type` int(10) NOT NULL,
  `remarks` varchar(250) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `id_livestock` int(10) DEFAULT NULL,
  `id_farm` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_vendor` (`id_vendor`),
  KEY `id_livestock` (`id_livestock`),
  KEY `id_farm` (`id_farm`),
  KEY `purchases_ibfk_4` (`id_receipt_type`),
  CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`id_vendor`) REFERENCES `vendor` (`id`),
  CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`id_livestock`) REFERENCES `livestock` (`id`),
  CONSTRAINT `purchases_ibfk_3` FOREIGN KEY (`id_farm`) REFERENCES `farm` (`id`),
  CONSTRAINT `purchases_ibfk_4` FOREIGN KEY (`id_receipt_type`) REFERENCES `receipt_type` (`id`)
) ;

CREATE TABLE `stock_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `stock` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stock` (`stock`)
) ;

CREATE TABLE `stock` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `stock_code` varchar(30) NOT NULL,
  `stock_type_id` int(10) NOT NULL,
  `stock_name` varchar(30) NOT NULL,
  `stock_balance` decimal(10,2) NOT NULL DEFAULT '0.00',
  `stock_purchase` decimal(10,2) NOT NULL DEFAULT '0.00',
  `purchase_date` datetime NOT NULL,
  `unit_cost` decimal(10,2) NOT NULL DEFAULT '0.00',
  `remarks` varchar(150) DEFAULT NULL,
  `total_cost` decimal(10,2) unsigned DEFAULT '0.00',
  `farm_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `stock_ibfk_1` (`stock_type_id`),
  KEY `stock_ibfk_2` (`farm_id`),
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`stock_type_id`) REFERENCES `stock_type` (`id`),
  CONSTRAINT `stock_ibfk_2` FOREIGN KEY (`farm_id`) REFERENCES `farm` (`id`)
) ;

CREATE TABLE `testtable` (
  `idtable1` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idtable1`)
) ;

CREATE TABLE `vaccine_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `vaccine` varchar(30) NOT NULL,
  `description` varchar(150)  NULL,
  `interval_period` INT(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vaccine` (`vaccine`)
) ;

CREATE TABLE `vaccination` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `vaccination_type_id` int(10) NOT NULL,
  `last_vaccination_date` datetime DEFAULT NULL,
  `next_vaccination_date` datetime DEFAULT NULL,
  `vaccination_date` datetime DEFAULT NULL,
  `manufactured_date` datetime  NULL,
  `vaccine_brand` VARCHAR(150) NULL DEFAULT NULL,
  `manufacturer_name` varchar(100) NULL,
  `vaccine_expiry_date` datetime  NULL,
  `dosage` DECIMAL(10,2) NULL,
  `health_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `health_id` (`health_id`),
  KEY `vaccination_type_id` (`vaccination_type_id`),
  CONSTRAINT `vaccination_ibfk_2` FOREIGN KEY (`vaccination_type_id`) REFERENCES `vaccine_type` (`id`),
  CONSTRAINT `vaccination_ibfk_1` FOREIGN KEY (`health_id`) REFERENCES `health` (`id`)
) ;


CREATE TABLE `reproduction` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lactation_number` INT(10) NOT NULL,
  `semen_number` varchar(30) NOT NULL,
  `semen_given_date` DATETIME NOT NULL,
  `remarks` VARCHAR(150) NULL,
  `sex` varchar(150) NOT NULL,
  `breed` varchar(20) NOT NULL,
  `livestock_id` INT(10) NOT NULL,
  `pregnency_test_date` DATETIME NULL,
  `pregnency_result` CHAR(1) NULL,
  `delivery_date` DATETIME NULL ,
  `number_of_calfs` INT(10) NULL,
  `calfs_sex` VARCHAR(20) NULL,
  
  PRIMARY KEY (`id`),
  KEY `livestock_id` (`livestock_id`),
  CONSTRAINT `reproduction_ibfk_1` FOREIGN KEY (`livestock_id`) REFERENCES `livestock` (`id`)
) ;
		
CREATE TABLE `suggested_feeding` (
  `id` INTEGER(10) NOT NULL AUTO_INCREMENT,
  `state_type` VARCHAR(30) NOT NULL,
  `feed_type` VARCHAR(30) NOT NULL ,
  `feed_quantity` INTEGER(5) NOT NULL ,
  `livestock_total` INTEGER(10) NULL,
  `schduled_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE  TABLE `ingredient_type` (
  `id` INT(10) NOT NULL AUTO_INCREMENT ,
  `ingredient` VARCHAR(30) NOT NULL ,
  `description` varchar(150)  NULL,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `ingredient_UNIQUE` (`ingredient` ASC) );

CREATE  TABLE `ingredient` (
  `id` INT(10) NOT NULL AUTO_INCREMENT ,
  `ingredient_type_id` INT(10) NOT NULL REFERENCES `ingredient_type` (`id` ),
  `TDN` DECIMAL(10,2) NOT NULL ,
  `CP` DECIMAL(10,2) NOT NULL ,
  `UDP` DECIMAL(10,2) NOT NULL ,
  `RDP` DECIMAL(10,2) NOT NULL ,
  `CA` DECIMAL(10,2) NOT NULL ,
  `P` DECIMAL(10,2) NOT NULL ,
  `RATE` DECIMAL(10,2) NOT NULL ,
  `farm_id` INT(10) NOT NULL  REFERENCES `farm` (`id` ),
  PRIMARY KEY (`id`) ,
  INDEX `ingredient_ibfk_1` (`ingredient_type_id` ASC) ,
  INDEX `ingredient_ibfk_2` (`farm_id` ASC) );

CREATE  TABLE `ingredient_options` (
  `id` INT(10) NOT NULL AUTO_INCREMENT ,
  `label` VARCHAR(30) NOT NULL ,
  `ingredient_type_id` INT(10) NOT NULL REFERENCES `ingredient_type` (`id` ),
  `value` DECIMAL(10,2) NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `ingredient_options_ibfk_1` (`ingredient_type_id` ASC));

CREATE TABLE `production_farm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `production_config_id` int(10) DEFAULT NULL,
  `yield` decimal(10,2) DEFAULT NULL,
  `fat_percentile` decimal(10,2) DEFAULT NULL,
  `month` INT(10) NULL DEFAULT NULL,
  `farm_id` int(10) NOT NULL,
  `snf` DECIMAL(10,2) NULL DEFAULT NULL,
  `clr` DECIMAL(10,2) NULL DEFAULT NULL,
  `rejection` DECIMAL(10,2) NULL DEFAULT NULL,
  `deduction` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `production_farm_ibfk_1` (`production_config_id`),
  KEY `production_farm_ibfk_2` (`farm_id`),  
  CONSTRAINT `production_farm_ibfk_1` FOREIGN KEY (`production_config_id`) REFERENCES `production_config` (`id`),
  CONSTRAINT `production_farm_ibfk_2` FOREIGN KEY (`farm_id`) REFERENCES `farm` (`id`)  
) ;
