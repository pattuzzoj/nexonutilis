import { Title, Meta } from '@solidjs/meta';

interface MetaProps {
  title: string;
  description: string;
  keywords: string;
};

export default function MetaData(props: MetaProps) {
  return (
  <>
    <Title>{props.title}</Title>
    <Meta name="description" content={props.description} />
    <Meta name="keywords" content={props.keywords} />
    <Meta name="og:description" content={props.description} />
  </>
  );
}