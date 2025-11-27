function MyList() {
  const data = ["React", "Spring Boot", "PostgreSQL"];
  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default MyList;
