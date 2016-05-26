/*
Navicat MySQL Data Transfer

Source Server         : lingjing
Source Server Version : 50154
Source Host           : localhost:3306
Source Database       : lingjing

Target Server Type    : MYSQL
Target Server Version : 50154
File Encoding         : 65001

Date: 2016-05-26 22:06:32
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `customer`
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `age` int(2) DEFAULT NULL,
  `sex` varchar(8) DEFAULT NULL,
  `telephonenumber` varchar(11) DEFAULT NULL,
  `balance` double(10,0) DEFAULT NULL,
  `sumofcomsumption` double(20,0) DEFAULT NULL,
  `sumofconsumption` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of customer
-- ----------------------------

-- ----------------------------
-- Table structure for `employee`
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL,
  `name` varchar(10) NOT NULL,
  `age` int(10) DEFAULT NULL,
  `password` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES ('1', 'lingjing', '凌净', '20', '640015');

-- ----------------------------
-- Table structure for `inventory`
-- ----------------------------
DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory` (
  `id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `count` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of inventory
-- ----------------------------

-- ----------------------------
-- Table structure for `payment`
-- ----------------------------
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment` (
  `paymentId` int(10) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) DEFAULT NULL,
  `amount` double(10,0) DEFAULT NULL,
  `desc` varchar(20) DEFAULT NULL,
  `saleId` int(10) DEFAULT NULL,
  PRIMARY KEY (`paymentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of payment
-- ----------------------------

-- ----------------------------
-- Table structure for `products`
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `proname` varchar(18) NOT NULL,
  `price` double(10,0) DEFAULT NULL,
  `udate` date DEFAULT NULL,
  `dayqty` int(10) DEFAULT NULL,
  `monqty` int(10) DEFAULT NULL,
  `type` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tm6owue934k6dfdbyimg1owfd` (`type`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`type`) REFERENCES `producttype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=291 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('126', '芒果奶茶', '15', '2016-05-04', '10', '300', '1');
INSERT INTO `products` VALUES ('127', '仙草奶茶', '10', '2016-05-07', '10', '300', '1');
INSERT INTO `products` VALUES ('290', '苹果奶茶', '10', '2016-05-07', '10', '300', '1');

-- ----------------------------
-- Table structure for `producttype`
-- ----------------------------
DROP TABLE IF EXISTS `producttype`;
CREATE TABLE `producttype` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of producttype
-- ----------------------------
INSERT INTO `producttype` VALUES ('1', '奶茶');
INSERT INTO `producttype` VALUES ('2', '红茶');
INSERT INTO `producttype` VALUES ('3', '奶茶');
INSERT INTO `producttype` VALUES ('4', '奶盖');
INSERT INTO `producttype` VALUES ('5', '贡茶');
INSERT INTO `producttype` VALUES ('6', '奶盖');
INSERT INTO `producttype` VALUES ('7', '贡茶');
INSERT INTO `producttype` VALUES ('8', '冰沙');
INSERT INTO `producttype` VALUES ('9', '冰沙');

-- ----------------------------
-- Table structure for `sale`
-- ----------------------------
DROP TABLE IF EXISTS `sale`;
CREATE TABLE `sale` (
  `saleid` int(10) NOT NULL AUTO_INCREMENT,
  `employeeid` int(10) NOT NULL,
  `total` double(10,0) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `salestate` int(2) DEFAULT NULL,
  PRIMARY KEY (`saleid`),
  KEY `FK_l6ugj18dahnbh400eilryomho` (`employeeid`),
  CONSTRAINT `FK_l6ugj18dahnbh400eilryomho` FOREIGN KEY (`employeeid`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sale
-- ----------------------------
INSERT INTO `sale` VALUES ('2', '1', '35', '2016-05-14', '2');

-- ----------------------------
-- Table structure for `saleslineitem`
-- ----------------------------
DROP TABLE IF EXISTS `saleslineitem`;
CREATE TABLE `saleslineitem` (
  `saleslineitemid` int(10) NOT NULL AUTO_INCREMENT,
  `saleid` int(10) NOT NULL,
  `productid` int(10) NOT NULL,
  `subtotal` double(10,0) NOT NULL,
  `productcount` int(10) DEFAULT NULL,
  PRIMARY KEY (`saleslineitemid`),
  KEY `FK_6j73rpmee6sfii1nil9evqin0` (`saleid`),
  KEY `FK_en65hh1m1puo418uk5xakr8sn` (`productid`),
  CONSTRAINT `FK_6j73rpmee6sfii1nil9evqin0` FOREIGN KEY (`saleid`) REFERENCES `sale` (`saleid`),
  CONSTRAINT `FK_en65hh1m1puo418uk5xakr8sn` FOREIGN KEY (`productid`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of saleslineitem
-- ----------------------------
INSERT INTO `saleslineitem` VALUES ('1', '2', '126', '20', '20');
INSERT INTO `saleslineitem` VALUES ('3', '2', '127', '15', '15');
