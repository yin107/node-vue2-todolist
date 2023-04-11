/*
 Navicat Premium Data Transfer

 Source Server         : ycy_mysql
 Source Server Type    : MySQL
 Source Server Version : 50730
 Source Host           : localhost:3306
 Source Schema         : my_vue_node48

 Target Server Type    : MySQL
 Target Server Version : 50730
 File Encoding         : 65001

 Date: 11/04/2023 09:16:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for task_list
-- ----------------------------
DROP TABLE IF EXISTS `task_list`;
CREATE TABLE `task_list`  (
  `task_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_german2_ci NOT NULL,
  `task_containt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_german2_ci NOT NULL,
  `end_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_german2_ci NOT NULL,
  `task_status` tinyint(4) NOT NULL COMMENT '任务状态，0:未完成，1：代办；2：已经完成',
  `created_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_german2_ci NOT NULL COMMENT '标记是那个用户建立的任务',
  `task_impo` tinyint(255) NOT NULL COMMENT '是否标星号',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_german2_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task_list
-- ----------------------------
INSERT INTO `task_list` VALUES ('开会111', '明天晚上开会', '2023-04-10', 2, '18397681876', 0, 1);
INSERT INTO `task_list` VALUES ('上班说', '学习', '2023-04-11', 2, '18397681876', 1, 2);
INSERT INTO `task_list` VALUES ('色色', '是大多数', '2023-04-12T16:00:00.000Z', 2, '18397681876', 1, 3);
INSERT INTO `task_list` VALUES ('大苏打', '倒数第三个', '2023-04-12T16:00:00.000Z', 2, '18397681876', 1, 4);
INSERT INTO `task_list` VALUES ('圣斗士1', '倒数第三个', '2023-04-04T16:00:00.000Z', 2, '18397681876', 1, 5);
INSERT INTO `task_list` VALUES ('生生世世', '是事实', '2023-04-05T16:00:00.000Z', 2, '18397681876', 0, 6);
INSERT INTO `task_list` VALUES ('wr', 'wrwrw', '2023-04-04T16:00:00.000Z', 2, '18397681876', 1, 7);
INSERT INTO `task_list` VALUES ('dsds', 'sds', '2023-04-05', 1, '18397681878', 1, 8);
INSERT INTO `task_list` VALUES ('ssss', 'ssss', '2023-04-11T16:00:00.000Z', 1, '18397681876', 0, 9);
INSERT INTO `task_list` VALUES ('ewrw', 'wrwr', '2023-04-26T16:00:00.000Z', 0, '18397681876', 0, 10);
INSERT INTO `task_list` VALUES ('4343', '343', '2023-04-04T16:00:00.000Z', 0, '18397681876', 0, 11);
INSERT INTO `task_list` VALUES ('第四范式', '师法是否', '2023-04-04T16:00:00.000Z', 0, '18397681876', 0, 12);
INSERT INTO `task_list` VALUES ('٩( \'ω\' )و get！', '到时导师', '2023-04-11T16:00:00.000Z', 0, '18397681876', 0, 13);

-- ----------------------------
-- Table structure for user_data
-- ----------------------------
DROP TABLE IF EXISTS `user_data`;
CREATE TABLE `user_data`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `card` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_german2_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_german2_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_german2_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_data
-- ----------------------------
INSERT INTO `user_data` VALUES (4, '18378', '$2a$10$8OQ8TJ2J67xzR6dfapiyGO3QaCvC/hxy48WCieVRzeVcNs6esFEOi');
INSERT INTO `user_data` VALUES (5, '18876', '$2a$10$BfLyKAXf8tJ4ITWRJRiNP.IVG/eGmxnayRIY.KrW2CwRnk5iJVPqC');

SET FOREIGN_KEY_CHECKS = 1;
