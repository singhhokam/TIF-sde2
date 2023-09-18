# TIF-sde2

## The Internet Folks: SDE Intern Assignmen [002]

SaaS project that enables user to make their communities and add members to it.

**About**
You run a SaaS Platform that enables user to make their communities and add members to it.

Each user, can create a community and (automatically) gets assigned the Community Admin role. They can add other users to the community who get assigned the Community Member role.

### Prerequisites

- Node.js installed (at least version 14)
- npm or yarn installed
- MySQL installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/singhhokam/TIF-sde2.git

   ```

2. cd TIF-sde2

   ```bash
   npm install

   ```

3. Set env variables as following
   ```
   DATABASE = "database name"
   USER = "database username"
   PASSWORD="database password"
   PORT = 8080
   SECRET = "your jwt secret"
   NODE_ENV = "development"
   ```
4. Start the project
   ```bash
   npm start
   ```

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

# Database Schema

## User (user)

| Key        | Kind               | Notes         |
| ---------- | ------------------ | ------------- |
| id         | string (snowflake) | primary key   |
| name       | varchar(64)        | default: null |
| email      | varchar(128)       | unique        |
| password   | varchar(64)        | -             |
| created_at | datetime           | -             |

## Community (community)

| Key        | Kind               | Notes                             |
| ---------- | ------------------ | --------------------------------- |
| id         | string (snowflake) | primary key                       |
| name       | varchar(128)       | -                                 |
| slug       | varchar(255)       | unique                            |
| owner      | string (snowflake) | ref: > user.id, relationship: m2o |
| created_at | datetime           | -                                 |
| updated_at | datetime           | -                                 |

## Role (role)

| Key        | Kind               | Notes       |
| ---------- | ------------------ | ----------- |
| id         | string (snowflake) | primary key |
| name       | varchar(64)        | unique      |
| created_at | datetime           | -           |
| updated_at | datetime           | -           |

## Member (member)

| Key        | Kind               | Notes               |
| ---------- | ------------------ | ------------------- |
| id         | string (snowflake) | primary key         |
| community  | string (snowflake) | ref: > community.id |
| user       | string (snowflake) | ref: > user.id      |
| role       | string (snowflake) | ref: > role.id      |
| created_at | datetime           | -                   |

# API Endpoints

## Role

- Create: `POST /v1/role`
- Get All: `GET /v1/role`

## User

- Sign Up: `POST /v1/auth/signup`
- Sign In: `POST /v1/auth/signin`
- Get Me: `GET /v1/auth/me`

## Community

- Create: `POST /v1/community`
- Get All: `GET /v1/community`
- Get All Members: `GET /v1/community/:id/members`
- Get My Owned Community: `GET /v1/community/me/owner`
- Get My Joined Community: `GET /v1/community/me/member`

## Member

- Add Member: `POST /v1/member`
- Remove Member: `DELETE /v1/member/:id`
