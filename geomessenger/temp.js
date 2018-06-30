// state = {
//   messages: []
// };

//   componentDidMount = async () => {
//     try {
//       const { messages } = await api.fetchMessages();
//       this.setState({ messages });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   componentDidUpdate = async prevProps => {
//     if (prevProps !== this.props) {
//       try {
//         const { messages } = await api.fetchMessages();
//         this.setState({ messages });
//       } catch (err) {
//         console.log(err);
//       }
//   }
// }
