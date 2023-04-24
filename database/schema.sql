set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- drop schema INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Watchlists" (
  "watchlistId" serial NOT NULL,
  "name" TEXT NOT NULL,
  CONSTRAINT "Watchlists_pk" PRIMARY KEY ("watchlistId")
) WITH (OIDS=FALSE);

CREATE TABLE "public"."Movies" (
  "movieId" serial NOT NULL,
  "title" TEXT NOT NULL,
  "releaseYear" integer NOT NULL,
  "director" TEXT NOT NULL,
  "cast" TEXT NOT NULL,
  "poster" TEXT NOT NULL,
  CONSTRAINT "Movies_pk" PRIMARY KEY ("movieId")
) WITH (OIDS=FALSE);

CREATE TABLE "public"."WatchlistItems" (
  "id" serial NOT NULL,
  "movieId" integer NOT NULL,
  "watchlistId" integer NOT NULL,
  CONSTRAINT "WatchlistItems_pk" PRIMARY KEY ("id")
) WITH (OIDS=FALSE);

ALTER TABLE "WatchlistItems" ADD CONSTRAINT "WatchlistItems_fk0" FOREIGN KEY ("movieId") REFERENCES "Movies"("movieId");
ALTER TABLE "WatchlistItems" ADD CONSTRAINT "WatchlistItems_fk1" FOREIGN KEY ("watchlistId") REFERENCES "Watchlists"("watchlistId");
