import Notice from "../components/Notice/Notice";
import OptionsBar from "../components/OptionsBar/OptionsBar";
import Races from "../components/Races/Races";
import RaceSchemas from '../components/RaceSchemas/RaceSchemas';

export interface Props {
  params: { subscriberID: string };
}

export default async function Unsubscribe({params}: Props) {
  const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)
  
  const res = await fetch(`https://${config.url}/api/email/unsubscribe/${context.query.subscriberID}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  const result = await res.json()
  
  return (
    <Layout>
      <h3 className="text-xl mb-4">Sorry to see you go!</h3>
      <Card>
        <p>You have been unsubscribed.</p>
      </Card>
    </Layout>
  );
}