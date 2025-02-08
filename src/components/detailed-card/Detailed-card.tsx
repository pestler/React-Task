import { useParams } from 'react-router-dom';
import './detailed-card.scss';

const DetailedCard = () => {
  const { id } = useParams();

  const getData = (id: string) => {
    return {
      title: `Детальная карточка #${id}`,
      description: 'Описание карточки',
    };
  };

  const data = getData(id);

  return (
    <div className="detailed-card">
      <h1>{data.title}</h1>
      <span>{data.description}</span>
      <span>{data.description}</span>
      <span>{data.description}</span>
      <span>{data.description}</span>
      <span>{data.description}</span>
    </div>
  );
};

export default DetailedCard;
