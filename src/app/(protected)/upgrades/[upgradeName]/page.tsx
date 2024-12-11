export default function page({ params }: { params: { upgradeName: string } }) {
  return <div>{params.upgradeName}</div>;
}
