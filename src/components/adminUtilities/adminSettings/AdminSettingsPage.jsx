import React, { useState } from 'react';
import './adminSettingsPage.css'; // Import custom CSS

const AdminSettingsPage = () => {
  const [username, setUsername] = useState('Admin');
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setSuccessMessage('Profile updated successfully!');
    console.log('Profile saved:', { username, email, password, notificationsEnabled });
  };

  return (
    <div className="admin-settings-container">
      <h1>Admin Settings</h1>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSaveProfile} className="settings-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
            />
            Enable Notifications
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default AdminSettingsPage;























// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';

// const AdminSettingsPage = () => {
//   const [username, setUsername] = useState('Admin');
//   const [email, setEmail] = useState('admin@example.com');
//   const [notificationsEnabled, setNotificationsEnabled] = useState(true);
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSaveProfile = (e) => {
//     e.preventDefault();
//     // Handle saving profile logic
//     console.log('Profile saved:', { username, email });
//   };

//   const handleSaveSecurity = (e) => {
//     e.preventDefault();
//     // Handle saving security logic
//     console.log('Security settings saved:', { password });
//   };

//   return (
//     <Container className="mt-4">
//       <h1 className="text-center mb-4">Admin Settings</h1>
//       <Row>
//         {/* User Management Section */}
//         <Col md={6}>
//           <Card className="mb-4">
//             <Card.Header>User Management</Card.Header>
//             <Card.Body>
//               <Form onSubmit={handleSaveProfile}>
//                 <Form.Group controlId="formUsername">
//                   <Form.Label>Username</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">
//                   Save Profile
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Notifications Section */}
//         <Col md={6}>
//           <Card className="mb-4">
//             <Card.Header>Notifications</Card.Header>
//             <Card.Body>
//               <Form>
//                 <Form.Group controlId="formNotifications">
//                   <Form.Check
//                     type="checkbox"
//                     label="Enable Notifications"
//                     checked={notificationsEnabled}
//                     onChange={(e) => setNotificationsEnabled(e.target.checked)}
//                   />
//                 </Form.Group>
//                 <Button variant="primary" type="button">
//                   Update Notifications
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Row>
//         {/* Security Settings Section */}
//         <Col md={12}>
//           <Card>
//             <Card.Header>Security Settings</Card.Header>
//             <Card.Body>
//               <Form onSubmit={handleSaveSecurity}>
//                 <Form.Group controlId="formPassword">
//                   <Form.Label>New Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Enter new password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formConfirmPassword">
//                   <Form.Label>Confirm Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Confirm new password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">
//                   Save Security Settings
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* Recent Activity Section */}
//       <Row className="mt-4">
//         <Col md={12}>
//           <Card>
//             <Card.Header>Recent Activity</Card.Header>
//             <Card.Body>
//               <ListGroup>
//                 <ListGroup.Item>User "John Doe" created an account.</ListGroup.Item>
//                 <ListGroup.Item>User "Jane Smith" updated their profile.</ListGroup.Item>
//                 <ListGroup.Item>Password changed for user "Alice Brown".</ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AdminSettingsPage;
