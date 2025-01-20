-- AlterTable
ALTER TABLE `clinic` ADD COLUMN `select` ENUM('active', 'inactive') NULL DEFAULT 'active';

-- CreateTable
CREATE TABLE `Medicine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `dosegeType` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `chooseDose` VARCHAR(191) NOT NULL,
    `regimen` VARCHAR(191) NOT NULL,
    `consume` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `period` VARCHAR(191) NOT NULL,
    `startmedication` VARCHAR(191) NOT NULL,
    `MedicationNotes` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Medicine_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
