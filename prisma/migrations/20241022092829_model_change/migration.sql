-- DropForeignKey
ALTER TABLE `clinicschedule` DROP FOREIGN KEY `ClinicSchedule_doctorId_fkey`;

-- AlterTable
ALTER TABLE `patient` ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `DoctorClinic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctorId` VARCHAR(191) NOT NULL,
    `clinicId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `DoctorClinic_doctorId_clinicId_key`(`doctorId`, `clinicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DoctorPatient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctorId` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `DoctorPatient_doctorId_patientId_key`(`doctorId`, `patientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EPrescription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `doctorId` VARCHAR(191) NOT NULL,
    `prescribedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `EPrescription_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Complaint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `complaintName` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `preiod` VARCHAR(191) NOT NULL,
    `complaintAt` DATETIME(3) NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `eprescriptionId` VARCHAR(191) NULL,

    UNIQUE INDEX `Complaint_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Finding` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `findingName` VARCHAR(191) NOT NULL,
    `reading` VARCHAR(191) NULL,
    `eprescriptionId` VARCHAR(191) NULL,
    `patientId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Finding_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FindingDocument` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `fileType` VARCHAR(191) NOT NULL,
    `fileUrl` VARCHAR(191) NOT NULL,
    `fileSize` INTEGER NOT NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `FindingId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FindingDocument_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Investigation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `investigationName` VARCHAR(191) NOT NULL,
    `reading` VARCHAR(191) NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `eprescriptionId` VARCHAR(191) NULL,

    UNIQUE INDEX `Investigation_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvestigationDocument` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `fileType` VARCHAR(191) NOT NULL,
    `fileUrl` VARCHAR(191) NOT NULL,
    `fileSize` INTEGER NOT NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `investigationId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `InvestigationDocument_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diagnosis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `diagnosisName` VARCHAR(191) NOT NULL,
    `reading` VARCHAR(191) NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `eprescriptionId` VARCHAR(191) NULL,

    UNIQUE INDEX `Diagnosis_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiagnosisDocument` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `fileType` VARCHAR(191) NOT NULL,
    `fileUrl` VARCHAR(191) NOT NULL,
    `fileSize` INTEGER NOT NULL,
    `diagnosisId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DiagnosisDocument_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClinicScheduleToDoctorClinic` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClinicScheduleToDoctorClinic_AB_unique`(`A`, `B`),
    INDEX `_ClinicScheduleToDoctorClinic_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DoctorClinic` ADD CONSTRAINT `DoctorClinic_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorClinic` ADD CONSTRAINT `DoctorClinic_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorPatient` ADD CONSTRAINT `DoctorPatient_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorPatient` ADD CONSTRAINT `DoctorPatient_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EPrescription` ADD CONSTRAINT `EPrescription_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EPrescription` ADD CONSTRAINT `EPrescription_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complaint` ADD CONSTRAINT `Complaint_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complaint` ADD CONSTRAINT `Complaint_eprescriptionId_fkey` FOREIGN KEY (`eprescriptionId`) REFERENCES `EPrescription`(`uid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Finding` ADD CONSTRAINT `Finding_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Finding` ADD CONSTRAINT `Finding_eprescriptionId_fkey` FOREIGN KEY (`eprescriptionId`) REFERENCES `EPrescription`(`uid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FindingDocument` ADD CONSTRAINT `FindingDocument_FindingId_fkey` FOREIGN KEY (`FindingId`) REFERENCES `Finding`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Investigation` ADD CONSTRAINT `Investigation_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Investigation` ADD CONSTRAINT `Investigation_eprescriptionId_fkey` FOREIGN KEY (`eprescriptionId`) REFERENCES `EPrescription`(`uid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvestigationDocument` ADD CONSTRAINT `InvestigationDocument_investigationId_fkey` FOREIGN KEY (`investigationId`) REFERENCES `Investigation`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diagnosis` ADD CONSTRAINT `Diagnosis_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diagnosis` ADD CONSTRAINT `Diagnosis_eprescriptionId_fkey` FOREIGN KEY (`eprescriptionId`) REFERENCES `EPrescription`(`uid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiagnosisDocument` ADD CONSTRAINT `DiagnosisDocument_diagnosisId_fkey` FOREIGN KEY (`diagnosisId`) REFERENCES `Diagnosis`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClinicScheduleToDoctorClinic` ADD CONSTRAINT `_ClinicScheduleToDoctorClinic_A_fkey` FOREIGN KEY (`A`) REFERENCES `ClinicSchedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClinicScheduleToDoctorClinic` ADD CONSTRAINT `_ClinicScheduleToDoctorClinic_B_fkey` FOREIGN KEY (`B`) REFERENCES `DoctorClinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
