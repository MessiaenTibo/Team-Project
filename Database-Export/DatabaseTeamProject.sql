-- MySQL dump 10.13  Distrib 5.7.37, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.5.5-10.5.18-MariaDB-0+deb11u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `spel`
--

DROP TABLE IF EXISTS `spel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spel` (
  `idSpel` int(11) NOT NULL,
  `spelNaam` varchar(45) NOT NULL,
  `spelers` int(11) NOT NULL,
  `tijd` datetime DEFAULT NULL,
  `naam1` varchar(45) NOT NULL,
  `aantalPalen` varchar(45) DEFAULT NULL,
  `naam2` varchar(45) DEFAULT NULL,
  `winnaar` varchar(45) DEFAULT NULL,
  `score` varchar(45) DEFAULT NULL,
  `moeilijkheidsgraad` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idSpel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spel`
--

LOCK TABLES `spel` WRITE;
/*!40000 ALTER TABLE `spel` DISABLE KEYS */;
INSERT INTO `spel` VALUES (1,'Speedrun',1,'2023-01-23 00:05:31','Tjorven','5',NULL,'Tjorven',NULL,'1'),(2,'1VS1',2,'2023-01-23 00:05:00','Tibo',NULL,'Lander','Lander','1',NULL),(3,'Simon Says',1,'2023-01-23 00:05:33','Cato','5',NULL,'Cato','11','2'),(4,'Shuttle Run',1,'2023-01-23 00:05:34','Shankar',NULL,NULL,'Shankar','11','3'),(5,'Speedrun',1,'2023-01-23 00:05:35','Ibe','5',NULL,'Ibe',NULL,'1'),(6,'1VS1',2,'2023-01-23 00:05:36','Lander',NULL,'Cato','Cato','1',NULL),(7,'Simon Says',1,'2023-01-23 00:05:37','Tibo','5',NULL,'Tibo','5','2'),(9,'Speedrun',1,'2023-01-23 00:05:38','Tjorven','5',NULL,'Tjorven',NULL,'3'),(10,'1VS1',2,'2023-01-23 00:05:39','Tibo',NULL,'Lander','Lander','6',NULL),(11,'Simon Says',1,'2023-01-23 00:05:40','Cato','5',NULL,'Cato','5','1'),(12,'Shuttle Run',1,'2023-01-23 00:05:41','Shankar',NULL,NULL,'Shankar','1','2'),(13,'Simon Says',1,'2023-01-23 00:05:42','Ibe',NULL,NULL,'Ibe','2','3'),(14,'1VS1',2,'2023-01-23 00:05:43','Lander',NULL,'Cato','Cato','13',NULL),(15,'Speedrun',1,'2023-01-23 00:05:44','Tibo','5',NULL,'Tibo',NULL,'1'),(16,'1VS1',2,'2023-01-23 00:05:45','Cato',NULL,'Tibo','Cato','19',NULL),(17,'Simon Says',1,'2023-01-23 00:05:46','Lander','5',NULL,'Lander','8','1'),(18,'Shuttle Run',1,'2023-01-23 00:05:47','Doran',NULL,NULL,'Doran','8','2'),(19,'Simon Says',1,'2023-01-23 00:05:48','Lei','5',NULL,'Lei','18','3'),(20,'Shuttle Run',1,'2023-01-23 00:05:49','Tibo',NULL,NULL,'Tibo','2','1'),(21,'Speedrun',1,'2023-01-23 00:05:50','Tjorven','5',NULL,'Tjorven',NULL,'2'),(22,'1VS1',2,'2023-01-23 00:05:51','Tibo',NULL,'Lander','Lander','19',NULL),(23,'Simon Says',1,'2023-01-23 00:05:52','Cato','5',NULL,'Cato','2','1'),(24,'Shuttle Run',1,'2023-01-23 00:05:53','Shankar',NULL,NULL,'Shankar','10','2'),(25,'1VS1',2,'2023-01-23 00:05:54','Lander',NULL,'Tjorven','Tjorven','11',NULL);
/*!40000 ALTER TABLE `spel` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-23 16:58:16
