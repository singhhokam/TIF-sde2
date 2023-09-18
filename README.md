# TIF-sde2

## The Internet Folks: SDE Intern Assignmen [002]

SaaS project that enables user to make their communities and add members to it.

**About**
You run a SaaS Platform that enables user to make their communities and add members to it.

Each user, can create a community and (automatically) gets assigned the Community Admin role. They can add other users to the community who get assigned the Community Member role.

**User Stories (Features)**

1. Module: Authentication
   - Feature: User should be able to signup
   - Feature: User should be able to signin using valid credentials.
2. Module: Community
   - Feature: User should be able to see all communities.
   - Feature: User should be able to create a community.
3. Module: Moderation
   - Feature: User should be able to see all community members.
   - Feature: User should be able to add a user as member.
   - Feature: User should be able to remove a member from community.

**Tech Stack**

- Language: Node v14+
- Database: Postgres / MySQL / MongoDB
- ORM: Sequelize / Prisma / Mongoose / MongoDB Native Driver
- Library: @theinternetfolks/snowflake to generate unique IDs instead of autoincrement, UUID or MongoDB ObjectID

**Models**

**Architecture**

![Database Schema](https://i.postimg.cc/yYxqP7P7/Hiring-Assignment.png)

**User (user)**

| key  | kind   | Notes   |
| ---- | ------ | ------- |
| test | helooo | no no n |
