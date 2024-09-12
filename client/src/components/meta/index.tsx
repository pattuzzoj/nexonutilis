import { Title, Meta } from '@solidjs/meta';

interface Props {
  title: string;
  description: string;
  keywords: string;
};

function MetaData(props: Props) {
  return (
  <>
    <Title>{props.title}</Title>
    <Meta name="description" content={props.description} />
    <Meta name="keywords" content={props.keywords} />
    <Meta name="og:description" content={props.description} />
  </>
  )
}

export default MetaData;