<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category_model extends CI_Model 
{


	public function get_categories($user_id)
	{


			$this->db->select('*');
            $this->db->from('categories');
			$this->db->where('categories.user_id', $user_id);
            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

	}

	

	public function get_id($id)
	{

			$this->db->select('categories.*');
			$this->db->from('categories');
			$this->db->where('categories.id', $id);
			$query = $this->db->get();
			return $query->row();
	}


	


	public function create($categoryData)
	{
		$this->db->insert('categories', $categoryData);
		return $this->db->insert_id();
	}




	public function update($id, $categoryData)
	{
		$this->db->where('id', $id);
		$this->db->update('categories', $categoryData);
	}



	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('categories');
	}

}
