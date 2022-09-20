alter table "public"."addresses"
  add constraint "addresses_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update cascade on delete restrict;
