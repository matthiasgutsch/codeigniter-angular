<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Appointment_type_model extends CI_Model 
{


	public function get_appointment_type($user_id)
	{


			$this->db->select('*');
            $this->db->from('appointment_type');
			$this->db->where('appointment_type.user_id', $user_id);
            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

	}

	

	public function get_id($id)
	{

			$this->db->select('appointment_type.*');
			$this->db->from('appointment_type');
			$this->db->where('appointment_type.id', $id);
			$query = $this->db->get();
			return $query->row();
	}


	


	public function create($categoryData)
	{
		$this->db->insert('appointment_type', $categoryData);
		return $this->db->insert_id();
	}




	public function update($id, $categoryData)
	{
		$this->db->where('id', $id);
		$this->db->update('appointment_type', $categoryData);
	}



	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('appointment_type');
	}

}
