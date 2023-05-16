import React, { useEffect, useState } from 'react';
import TableList from '../../components/table-list/table-list';
import { getPatientVisits } from '../../resources/visit-resource';
import { Button } from 'antd';
import { Visit } from '../../models/visit';

const columns = [
  {
    title: 'VisitDate',
    dataIndex: 'visitDate',
    key: 'visitDate',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'VisitType',
    dataIndex: 'visitType',
    key: 'visitType',
  },
  {
    title: 'Visit Stop Date',
    dataIndex: 'visitEnd',
    key: 'action',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];

const PatientVisits: React.FC<{ patientUuid: string; complete: boolean }> = ({
  patientUuid,
  complete,
}) => {
  const [visits, setPatientVisits] = useState<Visit[]>([]);

  useEffect(() => {
    getPatientVisits(patientUuid).then((pv) => {
      const filteredVisits = filterCompleteVisits(pv, complete);
      setPatientVisits(filteredVisits);
    });
  }, [patientUuid, complete]);

  const endVisitHandler = (visitUuid: string) => {
    console.log('endVisitHandler...', visitUuid);
  };

  const filterCompleteVisits = (visits: Visit[], complete: boolean) => {
    return visits.filter((v) => {
      if (complete) {
        return v.visitEnd !== 'null';
      } else {
        return v.visitEnd === 'null';
      }
    });
  };

  return (
    <TableList
      cols={columns}
      data={visits.map((pv) => {
        return {
          key: pv.uuid,
          location: pv.location.name,
          visitDate: pv.visitDate,
          visitType: pv.visitType.name,
          visitEnd: pv.visitEnd,
          action: (
            <Button
              type="primary"
              danger
              onClick={() => endVisitHandler(pv.uuid)}
            >
              End Visit
            </Button>
          ),
        };
      })}
    />
  );
};

export default PatientVisits;
