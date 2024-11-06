import Card from "../Components/Card";

const CardContainer = ({ cards, onEdit, viewDetail }) => (
  <div className="grid items-start gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
    {cards.map((card) => (
      <Card
        key={card.id}
        title={card.title}
        descriptions={card.descriptions}
        button={card.button}
        subtitle={card.subtitle}
        subDescriptions={card.subDescriptions}
        onEdit={(text, key) => {
          onEdit(text, key);
          console.log("Edit:", text, key);
        }}
        viewDetail={viewDetail}
      />
    ))}
  </div>
);

export default CardContainer;
