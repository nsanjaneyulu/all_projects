-- Bug fix 57
ALTER TABLE `reproduction` CHANGE COLUMN `sex` `sex` VARCHAR(150) NULL  ;
ALTER TABLE `reproduction` CHANGE COLUMN `breed` `breed` VARCHAR(20) NULL  ;
ALTER TABLE `receipt_type` ADD COLUMN `description` VARCHAR(150) NULL AFTER `receipt` ;
ALTER TABLE `expense_type` ADD COLUMN `description` VARCHAR(150) NULL  AFTER `expense` ;
ALTER TABLE `stock_type` RENAME TO  `stock_category` ;
ALTER TABLE `stock` DROP COLUMN `total_cost` , DROP COLUMN `remarks` , DROP COLUMN `unit_cost` , DROP COLUMN `purchase_date` , DROP COLUMN `stock_purchase` , ADD COLUMN `stock_min_level` DECIMAL(10,2) NOT NULL DEFAULT 0.00  AFTER `stock_name` ;
ALTER TABLE `stock` DROP FOREIGN KEY `stock_ibfk_1` ;
ALTER TABLE `stock` CHANGE COLUMN `stock_type_id` `stock_category_id` INT(10) NOT NULL  , ADD CONSTRAINT `stock_ibfk_1`  FOREIGN KEY (`stock_category_id` )  REFERENCES `stock_category` (`id` );
ALTER TABLE `stock` RENAME TO `stock_type` ;
CREATE  TABLE `stock_audit` (
  `id` INT(10) NOT NULL AUTO_INCREMENT ,
  `audit_date` DATETIME NOT NULL ,
  `stock_type_id` INT(10) NOT NULL ,
  `operation` VARCHAR(45) NOT NULL ,
  `quantity` DECIMAL(10,2) NOT NULL ,
  PRIMARY KEY (`id`) );
ALTER TABLE `stock_audit`
  ADD CONSTRAINT `stock_audit_ibfk_1`
  FOREIGN KEY (`stock_type_id` )
  REFERENCES `stock_type` (`id` )
  , ADD INDEX `stock_audit_ibfk_1` (`stock_type_id` ASC) ;
-- Add Feeding History

ALTER TABLE `feeding_history` DROP FOREIGN KEY `feeding_history_ibfk_2` , DROP FOREIGN KEY `feeding_history_ibfk_1` ;
ALTER TABLE `feeding_history` DROP COLUMN `id_livestock` , ADD COLUMN `state_type` VARCHAR(30) NOT NULL  AFTER `feed_date` , ADD COLUMN `livestock_total` INT(10) NOT NULL DEFAULT 0  AFTER `state_type` 
, DROP INDEX `feed_type_id` 
, ADD INDEX `feed_type_id` (`feed_type_id` ASC, `state_type` ASC) 
, DROP INDEX `id_livestock` ;

ALTER TABLE `feeding_history` CHANGE COLUMN `feed_type_id` `feed_type` VARCHAR(30) NOT NULL  ;
ALTER TABLE `devermitization` CHANGE COLUMN `last_vermitization_date` `last_vermitization_date` DATETIME NULL  , CHANGE COLUMN `next_vermitization_date` `next_vermitization_date` DATETIME NULL  , CHANGE COLUMN `vermitization_date` `vermitization_date` DATETIME NULL  ;
ALTER TABLE `asset_type` ADD COLUMN `description` VARCHAR(150) NULL  AFTER `asset` ;
ALTER TABLE `vendor_type` ADD COLUMN `description` VARCHAR(150) NULL  AFTER `vendor` ;
ALTER TABLE `stock_category` ADD COLUMN `description` VARCHAR(150) NULL  AFTER `stock` ;

-- Calf feeding status changes
ALTER TABLE `livestock` ADD COLUMN `stop_calf_feed_status` CHAR(1) NULL  AFTER `stop_milking_status` ;
ALTER TABLE `livestock` CHANGE COLUMN `stop_calf_feed_status` `stop_calf_feed_status` CHAR(1) NULL DEFAULT 'N'  ;
update livestock set stop_calf_feed_status='N' where 1=1 and state_type_id  in ( select id from state_type where state_type='Calf');


ALTER TABLE `livestock` ADD COLUMN `deceased` CHAR(1) NOT NULL DEFAULT 'N'  AFTER `sex` ;

ALTER TABLE `purchases` ADD COLUMN `unitprice` DECIMAL(10,2) NOT NULL DEFAULT '0.00'  AFTER `id_farm` , ADD COLUMN `quantity` DECIMAL(10,2) NOT NULL DEFAULT '0.00'  AFTER `unitprice` ;
ALTER TABLE `expenses` ADD COLUMN `unitprice` DECIMAL(10,2) NOT NULL DEFAULT '0.00'  AFTER `id_expense_type` , ADD COLUMN `quantity` DECIMAL(10,2) NOT NULL DEFAULT '0.00'  AFTER `unitprice` ;
UPDATE  `expenses` set quantity=1, unitprice=amount;
UPDATE  `purchases` set quantity=1, unitprice=amount;
ALTER TABLE `asset` CHANGE COLUMN `total_cost` `total_cost` DECIMAL(18,2) NOT NULL DEFAULT '0.00'  ;
ALTER TABLE `expenses` CHANGE COLUMN `amount` `amount` DECIMAL(18,2) NOT NULL DEFAULT '0.00'  ;
ALTER TABLE `purchases` CHANGE COLUMN `amount` `amount` DECIMAL(18,2) NOT NULL DEFAULT '0.00'  ;
ALTER TABLE `livestock` ADD COLUMN `deceased_date` DATETIME NULL DEFAULT NULL  AFTER `stop_calf_feed_status` ;
CREATE TABLE farm_users(id int(10) NOT NULL,username varchar(30),password nvarchar(64),role varchar(30),farm_id int(10) NOT NULL);
insert into farm_users values(1,'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 'ROLE_ADMIN',1);
insert into farm_users values(2,'user', '12dea96fec20593566ab75692c9949596833adc9', 'ROLE_USER',1);

ALTER TABLE `breed_type` 
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `description` , 
ADD CONSTRAINT `breed_type_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `breed_type_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `state_type` 
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `description` , 
ADD CONSTRAINT `state_type_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `state_type_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `origin_type` 
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `description` ,
ADD CONSTRAINT `origin_type_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `origin_type_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `milking_status`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `description` ,
ADD CONSTRAINT `milking_status_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `milking_status_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `vaccine_type`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `interval_period` , 
ADD CONSTRAINT `vaccine_type_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `vaccine_type_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `de_vermitization_type`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `interval_period` , 
ADD CONSTRAINT `de_vermitization_type_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `de_vermitization_type_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `decease_type`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `description` , 
ADD CONSTRAINT `decease_type_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `decease_type_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `feed_type`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `description` , 
ADD CONSTRAINT `feed_type_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `feed_type_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `receipt_type`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `description` , 
ADD CONSTRAINT `receipt_type_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `receipt_type_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `expense_type` 
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `description` , 
ADD CONSTRAINT `expense_type_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `expense_type_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `vendor_type` 
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `description` ,   
ADD CONSTRAINT `vendor_type_ibfk_1`  
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `vendor_type_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `asset_type`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `description` , 
ADD CONSTRAINT `asset_type_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `asset_type_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `stock_category`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `description` , 
ADD CONSTRAINT `stock_category_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `stock_category_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `ingredient_type` 
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `description` , 
ADD CONSTRAINT `ingredient_type_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `ingredient_type_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `contact` 
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `emailId` , 
ADD CONSTRAINT `contact_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `contact_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `decease` 
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `health_id` , 
ADD CONSTRAINT `decease_ibfk_3`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `decease_ibfk_3` (`farm_id` ASC) ;

ALTER TABLE `devermitization` 
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `health_id` , 
ADD CONSTRAINT `devermitization_ibfk_3`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `devermitization_ibfk_3` (`farm_id` ASC) ;

ALTER TABLE `feeding_config`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `order` , 
ADD CONSTRAINT `feeding_config_ibfk_2`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `feeding_config_ibfk_2` (`farm_id` ASC) ;

ALTER TABLE `feeding_history`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `livestock_total` , 
ADD CONSTRAINT `feeding_history_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `feeding_history_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `health`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `id` , 
ADD CONSTRAINT `health_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `health_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `ingredient_options`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `value` , 
ADD CONSTRAINT `ingredient_options_ibfk_2`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `ingredient_options_ibfk_2` (`farm_id` ASC) ;

ALTER TABLE `production_config`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `order` , 
ADD CONSTRAINT `production_config_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `production_config_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `promotion_history`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `promotion_date` , 
ADD CONSTRAINT `promotion_history_ibfk_4`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `promotion_history_ibfk_4` (`farm_id` ASC) ;

ALTER TABLE `provision_inventory` 
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `purchase_date` , 
ADD CONSTRAINT `provision_inventory_ibfk_3`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `provision_inventory_ibfk_3` (`farm_id` ASC) ;

ALTER TABLE `provisions`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `provision_name` , 
ADD CONSTRAINT `provisions_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `provisions_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `reproduction`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `calfs_sex` , 
ADD CONSTRAINT `reproduction_ibfk_2`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `reproduction_ibfk_2` (`farm_id` ASC) ;

ALTER TABLE `stock_audit` 
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `quantity` , 
ADD CONSTRAINT `stock_audit_ibfk_2`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `stock_audit_ibfk_2` (`farm_id` ASC) ;

ALTER TABLE `suggested_feeding`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `schduled_date` , 
ADD CONSTRAINT `suggested_feeding_ibfk_1`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `suggested_feeding_ibfk_1` (`farm_id` ASC) ;

ALTER TABLE `vaccination`
ADD COLUMN `farm_id` INT(10) NOT NULL  AFTER `health_id` , 
ADD CONSTRAINT `vaccination_ibfk_3`
FOREIGN KEY (`farm_id` )
REFERENCES `farm` (`id` )
, ADD INDEX `vaccination_ibfk_3` (`farm_id` ASC) ;

ALTER TABLE `breed_type` DROP INDEX `breed_type` ;
ALTER TABLE `state_type` DROP INDEX `state_type` ;
ALTER TABLE `origin_type` DROP INDEX `origin_type` ;
ALTER TABLE `milking_status` DROP INDEX `status` ;
ALTER TABLE `vaccine_type` DROP INDEX `vaccine` ;
ALTER TABLE `de_vermitization_type` DROP INDEX `de_vermitization_type` ;
ALTER TABLE `decease_type` DROP INDEX `decease` ;
ALTER TABLE `receipt_type` DROP INDEX `receipt` ;
ALTER TABLE `expense_type` DROP INDEX `expense` ;
ALTER TABLE `vendor_type` DROP INDEX `vendor` ;
ALTER TABLE `asset_type` DROP INDEX `asset` ;
ALTER TABLE `stock_category` DROP INDEX `stock` ;
ALTER TABLE `ingredient_type` DROP INDEX `ingredient_UNIQUE` ;
ALTER TABLE `contact` DROP INDEX `name` ;
ALTER TABLE `production_config` DROP INDEX `order` , DROP INDEX `yeild_slot_name` ;


CREATE  TABLE `farm_configuration` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `farm_id` INT(10) NOT NULL  REFERENCES `farm` (`id` ),
  `pagination` INT(3) NOT NULL ,
  `summary_pagination` INT(3) NOT NULL ,
  `milk_prd_pagination` INT(3) NOT NULL ,
  `calf_state_type_id` INT(10) NOT NULL REFERENCES `state_type` (`id` ),
  `heafer_state_type_id` INT(10) NOT NULL REFERENCES `state_type` (`id` ),
  `herd_state_type_id` INT(10) NOT NULL REFERENCES `state_type` (`id` ),
  `auto_re_produce` CHAR NOT NULL DEFAULT 'Y' ,
  `non_milking_status_id` INT(10) NOT NULL REFERENCES `milking_status` (`id` ),
  `code_prefix` CHAR(5) NOT NULL ,
  `milk_prd_choice` CHAR NULL DEFAULT '1' ,
  PRIMARY KEY (`id`) 
  );
  
ALTER TABLE `devermitization` ADD COLUMN `batch_number` VARCHAR(15) NULL  AFTER `manufacturer_name` ;
ALTER TABLE `decease` ADD COLUMN `symptoms` VARCHAR(150) NULL DEFAULT NULL  AFTER `farm_id` ;

ALTER TABLE `livestock` CHANGE COLUMN `lactation_number` `lactation_number` INT(3) NULL DEFAULT NULL  , 
CHANGE COLUMN `lactation_days` `lactation_days` DATETIME NULL DEFAULT NULL  ;
ALTER TABLE `livestock` ADD COLUMN `dryoff_date` DATETIME NULL  AFTER `deceased_date` ;

CREATE  TABLE `lactation` (
  `id` INT(10) NOT NULL AUTO_INCREMENT ,
  `lactation_number` INT(3) NULL ,
  `start_date` DATETIME NULL ,
  `end_date` DATETIME NULL ,
  `livestock_id` INT(10) NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `lactation_ibfk_1` (`livestock_id` ASC) ,
  CONSTRAINT `lactation_ibfk_1`
    FOREIGN KEY (`livestock_id` )
    REFERENCES `farm`.`livestock` (`id` ));
    
  
ALTER TABLE `livestock` DROP COLUMN `dryoff_date` , DROP COLUMN `lactation_days` , DROP COLUMN `lactation_number` ;
ALTER TABLE `person` CHANGE COLUMN `job_type` `job_type` CHAR(1) NOT NULL  ;
alter table farm_configuration add column inhouse_origin_type_id INT(10) NOT NULL references origin_type(id);  

update farm_configuration set inhouse_origin_type_id=1;