set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Watchlists" (
	"watchlistId" serial NOT NULL,
	"userId" integer NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "Watchlists_pk" PRIMARY KEY ("watchlistId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Movies" (
	"movieId" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	"releaseYear" integer NOT NULL,
	"director" TEXT NOT NULL,
	"cast" TEXT NOT NULL,
	"poster" TEXT NOT NULL,
	CONSTRAINT "Movies_pk" PRIMARY KEY ("movieId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."WatchlistItems" (
	"movieId" TEXT NOT NULL,
	"watchlistId" integer NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Watchlists" ADD CONSTRAINT "Watchlists_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");


ALTER TABLE "WatchlistItems" ADD CONSTRAINT "WatchlistItems_fk1" FOREIGN KEY ("watchlistId") REFERENCES "Watchlists"("watchlistId");
