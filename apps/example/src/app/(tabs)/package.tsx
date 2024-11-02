import { DataTable } from '@nativebricks/core';
import React from 'react';
import { View } from 'react-native';

export default function Package() {
  return (
    <View className="flex-1 p-4 pt-12">
      <DataTable
        headRowClassName="bg-black"
        headRowTextClassName="text-white"
        keyExtractor={(item) => item.name}
        data={[
          {
            name: 'John Doe',
            age: 25,
            sex: 'male',
            marks: {
              maths: 90,
              science: 80,
              english: 70,
            },
          },
          {
            name: 'Jane Doe',
            age: 21,
            sex: 'Female',
            marks: {
              maths: 80,
              science: 70,
              english: 60,
            },
          },
          {
            name: 'Roger Smith',
            age: 35,
            sex: 'Male',
            marks: {
              maths: 70,
              science: 60,
              english: 50,
            },
          },
        ]}
        columns={[
          {
            title: 'Name',
            accessor: (row) => row.name,
          },
          {
            title: 'Marks',
            headerClassName: 'border-b border-border items-center justify-center',
            children: [
              {
                title: 'Maths',
                accessor: (row) => row.marks.maths,
                headerClassName: 'items-center justify-center',
                className: 'items-center',
              },
              {
                title: 'Science',
                accessor: (row) => row.marks.science,
                headerClassName: 'items-center justify-center',
                className: 'items-center',
              },
              {
                title: 'English',
                accessor: (row) => row.marks.english,
                headerClassName: 'items-center justify-center',
                className: 'items-center',
              },
            ],
          },
        ]}
      />
    </View>
  );
}
