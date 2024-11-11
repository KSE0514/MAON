package com.easter.watch.presentation.view.run

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.AnimationUtils
import android.widget.ImageView
import androidx.fragment.app.activityViewModels
import com.easter.watch.R
import com.easter.watch.databinding.FragmentRun2Binding


// RunFragment2.kt
class RunFragment2 : Fragment() {
    private var _binding: FragmentRun2Binding? = null
    private val binding get() = _binding!!
    private val viewModel: RunViewModel by activityViewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentRun2Binding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupObservers()
    }

    private fun setupObservers() {
        viewModel.distance.observe(viewLifecycleOwner) { distance ->
            binding.distanceText.text = String.format("%.2f", distance)
        }

        viewModel.pace.observe(viewLifecycleOwner) { pace ->
            binding.paceText.text = pace
        }
    }
}