import { Tabs, TabTrigger } from "@/components/ui/Tabs";
import AuthenticationCvScanning from "@/feature/cv-scanning/components/AuthenticationCvScanning";
import NonLoginCvScanning from "@/feature/cv-scanning/components/NonLoginCvScanning";
import { authStore } from "@/feature/goolge-login/store/auth-store";
import { useState } from "react";

export default function CvPage() {
  const [tabValue, setTabValue] = useState('normal')
  const isAuthorized = authStore.getState().accessToken
  
  return (
    <div className="bg-deep-cove rounded-md px-10 py-5">
        <h1 className="text-3xl text-center text-secondary font-medium">Phân tích CV với AI</h1>
        <div className="flex">
          <Tabs variant='secondary'>
            <TabTrigger isSelect={tabValue == 'normal'} onSelect={setTabValue} content="Phân tích" value="normal"/>
            <TabTrigger isDisable={isAuthorized ? false : true} isSelect={tabValue == 'advanced'}  onSelect={setTabValue} content="Phân tích nâng cao" value="advanced"/>
          </Tabs>
        </div>
        <div className="bg-secondary rounded-sm px-5 py-3 my-3">
          {tabValue === 'normal' &&
            <NonLoginCvScanning/>
          }
          {
            tabValue === 'advanced' &&
            <AuthenticationCvScanning/>
          }
        </div>
    </div>
  )
}
