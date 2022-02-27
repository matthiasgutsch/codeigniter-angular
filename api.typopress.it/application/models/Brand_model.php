<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Brand_model extends CI_Model 
{


	public function get_brands($user_id)
	{

			$this->db->select('*');
            $this->db->from('brands');
			$this->db->where('brands.user_id', $user_id);
			$this->db->order_by('category_name','ASC');
            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

	}

	

	public function get_id($id)
	{

			$this->db->select('brands.*');
			$this->db->from('brands');
			$this->db->where('brands.id', $id);
			$query = $this->db->get();
			return $query->row();
	}


	


	public function create($categoryData)
	{
		$this->db->insert('brands', $categoryData);
		return $this->db->insert_id();
	}




	public function update($id, $categoryData)
	{
		$this->db->where('id', $id);
		$this->db->update('brands', $categoryData);
	}



	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('brands');
	}

}
