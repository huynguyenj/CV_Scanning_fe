import { Tabs, TabTrigger } from "@/components/ui/Tabs";
import { useState } from "react";

export default function CvPage() {
  const [tabValue, setTabValue] = useState('normal')

  console.log(tabValue);
  
  return (
    <div className="bg-deep-cove rounded-md px-10 py-5">
        <h1 className="text-3xl text-center text-secondary font-medium">Phân tích CV với AI</h1>
        <div className="">
          <Tabs variant='secondary'>
            <TabTrigger isSelect={tabValue == 'normal'} onSelect={setTabValue} content="Phân tích" value="normal"/>
            <TabTrigger isSelect={tabValue == 'advanced'}  onSelect={setTabValue} content="Phân tích nâng cao" value="advanced"/>
          </Tabs>
        </div>
    </div>
  )
}
