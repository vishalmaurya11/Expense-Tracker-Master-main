drop table if exists  Member;
create table Member(
    Mem_id bigserial,
    Fname varchar(20) not null,
    Lname varchar(20) not null,
    DOB timestamp,
    Salary numeric(15,2) not null check (Salary>=0),
    Phone_Num char(10) check (length(Phone_Num)=10),
    Email varchar(30) not null,
    Password varchar(20) not null,
    primary key (Mem_id)
);


drop table if exists  Groups;
create table Groups(
    Group_id bigserial,
    Owner_id bigserial,
    Name varchar(20) not null,
    Created_on timestamp,
    primary key (Group_id),
    foreign key (Owner_id) references Member
);

drop table if exists  Belongs_To;
create table Belongs_To(
    Mem_id bigserial,
    Group_id bigserial,
    amount_due numeric(15,2) not null,
    primary key(Mem_id,Group_id),
    foreign key (Mem_id) references Member,
    foreign key (Group_id) references Groups
);

drop table if exists  Group_Expense;
create table Group_Expense(
    Expense_id bigserial,
    Group_id bigserial,
    Paid_by_mem_id bigserial,
    Added_by_mem_id bigserial,
    Amount numeric(15,2) not null check (Amount>=0),
    Remarks varchar(30) not null,
    Date timestamp,
    primary key (Expense_id),
    foreign key (Group_id) references Groups,
    foreign key (Paid_by_mem_id) references member,
    foreign key (Added_by_mem_id) references member
);

drop table if exists  shares;
create table shares(
    Expense_id bigserial,
    Group_id bigserial,
    Mem_id bigserial,
    Share_amount numeric(15,2) not null,
    Settled boolean,
    primary key (Expense_id,Group_id,Mem_id),           
    foreign key (Expense_id) references Group_Expense,
    foreign key (Group_id) references Groups,
    foreign key (Mem_id) references member
);

drop table if exists  expense_type;
create table expense_type(
    Expense_type_id bigserial,
    Type varchar(20),
    primary key(Expense_type_id)
);

drop table if exists  Individual_Expense;
create table Individual_Expense(
    Expense_id bigserial,
    Mem_id bigserial,
    Amount numeric(15,2) not null check(Amount>=0),
    Date timestamp,
    Remarks varchar(30) not null,
    Expense_type_id bigserial,
    primary key (Expense_id),
    foreign key (Mem_id) references Member,
    foreign key (Expense_type_id) references expense_type
);