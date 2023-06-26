/*
  Warnings:

  - A unique constraint covering the columns `[validate_code]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_validate_code_key" ON "users"("validate_code");
