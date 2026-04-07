/*
  Warnings:

  - A unique constraint covering the columns `[panelId]` on the table `ApiToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ApiToken_panelId_key" ON "ApiToken"("panelId");
