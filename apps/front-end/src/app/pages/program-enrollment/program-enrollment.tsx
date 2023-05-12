import React, { useState, useEffect } from 'react';
import NewEnrollment from './new-enrollment';
import EnrolledPrograms from '../../components/enrollment-table/enrolled-programs';
import { Patient } from '../../models/patient';
import { getPrograms } from '../../resources/program-resource';
import { Program } from '../../models/programs';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import {
  getEnrolledPrograms,
  getCompletedPrograms,
} from '../../resources/program-enrollment.resource';
import { PatientProgramEnrollment } from '../../models/program-enrollment';

const ProgramEnrollment: React.FC<{ patient: Patient }> = ({ patient }) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [enrolledPrograms, setEnrolledPrograms] = useState<
    PatientProgramEnrollment[]
  >([]);
  const [completedPrograms, setCompletedPrograms] = useState<
    PatientProgramEnrollment[]
  >([]);
  const items: TabsProps['items'] = [
    {
      key: 'enroll',
      label: `Enroll+`,
      children: <NewEnrollment programs={programs} />,
    },
    {
      key: 'enrolled-programs',
      label: `Enrolled Programs`,
      children: <EnrolledPrograms patientPrograms={enrolledPrograms} />,
    },
    {
      key: 'completed-programs',
      label: `Completed Programs`,
      children: <EnrolledPrograms patientPrograms={completedPrograms} />,
    },
  ];

  useEffect(() => {
    getPrograms().then((results) => {
      setPrograms(results);
    });
    getEnrolledPrograms(patient.uuid).then(
      (enrolledPrograms: PatientProgramEnrollment[]) => {
        setEnrolledPrograms(enrolledPrograms);
      }
    );
    getCompletedPrograms(patient.uuid).then((completedPrograms) => {
      setCompletedPrograms(completedPrograms);
    });
  }, [patient]);
  return (
    <>
      <h4>Program Enrollments</h4>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default ProgramEnrollment;
