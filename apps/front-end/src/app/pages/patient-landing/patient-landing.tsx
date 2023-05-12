import React,{ useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Patient } from "../../models/patient";
import { getPatient } from "../../resources/patient.resource";
import PatientInfo from "../../components/patient-info/patient-info";

const PatientLanding: React.FC = ()=>{
    const data = useLoaderData();
    const [currentPatient,setCurrentPatient]= useState<Patient>();
    const [patientLoaded,setPatientLoaded] = useState<boolean>(false)

    useEffect(()=> {
        getCurrentPatient(data.uuid).then((patient:Patient)=>{
            setCurrentPatient(patient);
            setPatientLoaded(true);
        });
    },[data]);
    const getCurrentPatient = async (patientUuid: string): Promise<Patient> =>{
           const patient: Patient = await getPatient(patientUuid);
           return patient;
    };
    return(
        <div>
        {patientLoaded && <PatientInfo patient={currentPatient} />}
        </div>
    );
}

export default PatientLanding;