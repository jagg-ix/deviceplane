
use deviceplane;
begin;

--
-- Users
--

create table if not exists users (
  id varchar(32) not null,
  created_at timestamp not null default current_timestamp,
  email varchar(255) not null,
  password_hash varchar(255) not null,

  primary key (id)
);

--
-- AccessKeys
--

create table if not exists access_keys (
  id varchar(32) not null,
  created_at timestamp not null default current_timestamp,
  user_id varchar(32) not null,
  hash varchar(255) not null,

  primary key (id)
);

--
-- Projects
--

create table if not exists projects (
  id varchar(32) not null,
  created_at timestamp not null default current_timestamp,
  name varchar(100) not null,

  primary key (id)
);

--
-- Memberships
--

create table if not exists memberships (
  user_id varchar(32) not null,
  project_id varchar(32) not null,
  level enum ('admin', 'write', 'read') not null,

  primary key (user_id, project_id)
);

--
-- Devices
--

create table if not exists devices (
  id varchar(32) not null,
  project_id varchar(32) not null,

  primary key (id)
);

--
-- Applications
--

create table if not exists applications (
  id varchar(32) not null,
  project_id varchar(32) not null,
  name varchar(100) not null,

  primary key (id)
);

--
-- Releases
--

create table if not exists releases (
  id varchar(32) not null,
  created_at timestamp not null default current_timestamp, 
  application_id varchar(32) not null,
  config longtext not null,

  primary key (id)
);

--
-- Commit
--

commit;

