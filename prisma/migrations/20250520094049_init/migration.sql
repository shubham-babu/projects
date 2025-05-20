-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genres" TEXT[],
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFavoriteMovies" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "UserFavoriteMovies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_phone_key" ON "User"("email", "phone");

-- AddForeignKey
ALTER TABLE "UserFavoriteMovies" ADD CONSTRAINT "UserFavoriteMovies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteMovies" ADD CONSTRAINT "UserFavoriteMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
