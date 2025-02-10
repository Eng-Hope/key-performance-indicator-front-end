import React from 'react'
import DepartmentList from './_components/department_list'
import AddUserToDepartMent from './_components/add_users'
import NewDepartment from './_components/new_department_form'

const Departments = () => {
  return (
    <div className="w-full h-screen p-5 flex flex-col gap-3">
      <DepartmentList />
    </div>
  )
}

export default Departments
