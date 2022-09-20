alter table "public"."addresses" alter column "user_id" drop not null;
alter table "public"."addresses" add column "user_id" uuid;
